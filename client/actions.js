import { createAction } from '@reduxjs/toolkit'

export const create = createAction('saga/create')
export const updateStatus = createAction('saga/updateStatus')
export const updateName = createAction('saga/updateName')
export const deleteOne = createAction('saga/deleteOne')
export const deleteDone = createAction('saga/deleteDone')
export const getItems = createAction('saga/getItems')
