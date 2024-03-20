import { createAction } from '@reduxjs/toolkit'

export const create = createAction('sagaTeam/create')
export const addUser = createAction('sagaTeam/addUser')
export const deleteUser = createAction('sagaTeam/deleteUser')
export const getTeam = createAction('sagaTeam/getTeam')
export const getFreeUsers = createAction('sagaTeam/getFreeUsers')
export const deleteTeam = createAction('sagaTeam/delete')
