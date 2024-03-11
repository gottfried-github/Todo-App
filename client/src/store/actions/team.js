import { createAction } from '@reduxjs/toolkit'

export const create = createAction('sagaTeam/create')
export const addUser = createAction('sagaTeam/addUser')
export const deleteUser = createAction('sagaTeam/deleteUser')
export const get = createAction('sagaTeam/get')
export const getUsers = createAction('sagaTeam/getUsers')
export const deleteTeam = createAction('sagaTeam/delete')
