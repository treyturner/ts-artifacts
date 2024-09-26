import { handlePaging, infoCall, pageCall } from "../http";
import type {
  CallOptions,
  DataPage,
  DataPageQuery,
  HasClient,
  TaskFull,
  TaskReq,
  TasksReq,
  TasksRewardFull,
  TasksRewardReq,
  TasksRewardsReq,
} from "../types";
import { getCallerName } from "../util";

export const tasksInfo = { get, getAll, getAllRewards, getPage, getReward, getRewardsPage };

async function get(this: HasClient, query: TaskReq) {
  const method = "GET";
  const path = `/tasks/list/${query.code}`;
  const opts: CallOptions = { auth: false, method, path, client: this.client };
  const responseBody = await infoCall<{ data: TaskFull }>(getCallerName(), opts);
  return responseBody.data;
}

function getPage(this: HasClient, query: TasksReq) {
  const method = "GET";
  const path = "/tasks/list";
  const opts: CallOptions = { auth: false, method, path, query, client: this.client };
  return pageCall<DataPage<TaskFull>>(getCallerName(), opts);
}

function getAll(this: HasClient, query?: DataPageQuery<TasksReq>) {
  return handlePaging<TaskFull, TasksReq>(
    this.client.config,
    getCallerName(),
    (fullQuery: TasksReq) => getPage.call(this, fullQuery),
    query,
  );
}

async function getReward(this: HasClient, query: TasksRewardReq) {
  const method = "GET";
  const path = `/tasks/rewards/${query.code}`;
  const opts: CallOptions = { auth: false, method, path, client: this.client };
  const responseBody = await infoCall<{ data: TasksRewardFull }>(getCallerName(), opts);
  return responseBody.data;
}

function getRewardsPage(this: HasClient, query: TasksRewardsReq) {
  const method = "GET";
  const path = "/tasks/rewards`";
  const opts: CallOptions = { auth: false, method, path, query, client: this.client };
  return pageCall<DataPage<TasksRewardFull>>(getCallerName(), opts);
}

function getAllRewards(this: HasClient) {
  return handlePaging<TasksRewardFull, never>(this.client.config, getCallerName(), (fullQuery: TasksRewardsReq) =>
    getRewardsPage.call(this, fullQuery),
  );
}
