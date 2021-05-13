import { User, USER_ROLE } from "../../src/model/User";

export let normalUserMock = new User(
  "id-normal",
  "normal",
  "normal@provi.com",
  "hash",
  USER_ROLE.NORMAL
);

export let normalUserMock2 = new User(
  "id-normal2",
  "normal2",
  "normal2@provi.com",
  "hash",
  USER_ROLE.NORMAL
); 

export let adminUserMock = new User(
  "id-admin",
  "admin",
  "admin@provi.com",
  "hash",
  USER_ROLE.ADMIN
); 