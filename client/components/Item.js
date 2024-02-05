import EventEmitter from '../utils/event-emitter'
import { Component, createElement } from '../utils/helpers'

import Events from '../events'

export default class Item extends Component {
  constructor(item, isEditing, handleEditCb) {
    super()

    this.item = item
    this.isEditing = isEditing
    this.handleEditCb = handleEditCb

    EventEmitter.subscribe(Events.STORAGE_UPDATED, this.render)
  }

  handleUpdateStatus = () => {
    let status = null

    if (this.item.status === 1) {
      status = 2
    } else {
      status = 1
    }

    EventEmitter.emit({
      type: Events.ITEM_UPDATE_STATUS_ONE,
      payload: { id: this.item.id, status },
    })
  }

  handleDelete = () => {
    EventEmitter.emit({
      type: Events.ITEM_DELETE_ONE,
      payload: this.item.id,
    })
  }

  handleEdit = () => {
    this.handleEditCb(this.item.id)
  }

  handleSubmitLabel = ev => {
    // for .isComposing see https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event
    if (ev.isComposing || ev.code !== 'Enter') return

    EventEmitter.emit({
      type: Events.ITEM_UPDATE_NAME,
      payload: {
        id: this.item.id,
        name: ev.target.value,
      },
    })

    this.handleEdit()
  }

  content = () => {
    const container = createElement('li', null, ['item'])
    const containerInput = createElement('div', null, ['input-container'])
    const inputCheckbox = createElement('input', this.item.id, ['input-checkbox'])

    let label = null

    if (this.isEditing) {
      label = createElement('input', null, ['input-edit'])
      label.setAttribute('type', 'text')
      label.value = this.item.name

      label.addEventListener('keyup', this.handleSubmitLabel)
    } else {
      label = createElement('label', null, null, this.item.name)
      label.setAttribute('for', inputCheckbox.id)
      if (this.item.done) label.classList.add('checked')
    }

    const editBtn = createElement('button', null, ['edit'], 'edit')
    const deleteBtn = createElement('button', null, ['delete'], 'delete')

    inputCheckbox.setAttribute('type', 'checkbox')
    inputCheckbox.checked = 1 === this.item.status

    containerInput.append(inputCheckbox, label)
    container.append(containerInput, editBtn, deleteBtn)

    inputCheckbox.addEventListener('click', this.handleUpdateStatus)
    editBtn.addEventListener('click', this.handleEdit)
    deleteBtn.addEventListener('click', this.handleDelete)

    return container
  }
}
