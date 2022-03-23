/* eslint-disable no-alert, no-console */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import css from './details.module.css'
import { updateMapNode } from '../store/mindMapReducer'
import { useStore } from '../store/Store'

Details.propTypes = {
  targetMap: PropTypes.any,
  data: PropTypes.any,
  mapId: PropTypes.number,
  testable: PropTypes.bool,
  id: PropTypes.number,
  description: PropTypes.string,
}

function Details({ targetMap }) {
  const { data } = targetMap
  const [, dispatch] = useStore() // Removed state to fix eslint
  const { register, handleSubmit } = useForm()
  // const [formName, setFormName] = useState('')
  const [formDescription, setFormDescription] = useState(
    targetMap.data.description,
  )
  const [formTestable, setFormTestable] = useState(data.testable)

  function onSubmit(formData) {
    const payload = {
      // radix parameter set to 10 decimal
      mapId: parseInt(targetMap.mapId, 10),
      nodeId: targetMap.id,
      data: formData,
    }
    /* eslint-disable no-alert, no-console */
    console.log(payload, 'payload sent to reducer')
    dispatch(updateMapNode(payload))
  }

  function toggleTestable(bool) {
    return !bool
  }

  useEffect(() => {
    setFormDescription(targetMap.data.description)
    setFormTestable(data.testable)
  }, [targetMap, data.testable])

  // const changeName = (e) => {
  //         const name = e.target.value;
  //     console.log(e.target)
  //     setFormName(name)
  //     }

  const editDescription = (e) => {
    const description = e.target.value
    setFormDescription(description)
  }

  return (
    <div className={css.container}>
      <h2>{data.label || 'Empty or error'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label>
            mapId - same for each node
            <input type="radio" aria-label="mapId" />
          </label>
          <input
            className={css.input}
            value={targetMap.mapId || 'error'}
            disabled
            type="text"
          />
        </fieldset>
        <fieldset>
          <label>
            nodeId - unique to node
            <input type="radio" aria-label="nodeId" />
          </label>
          <input
            className={css.input}
            value={targetMap.id || 'error'}
            disabled
            type="text"
          />
        </fieldset>
        {/* <fieldset>
                    <label>Name</label>
                    <input 
                        className={css.input}
                        {...register("Name")}
                        onChange={changeName}
                        defaultValue={data.label || "error"} 
                        type="text" 
                    />
                </fieldset> */}
        <fieldset>
          <label>
            Description
            <input type="radio" aria-label="description" />
          </label>
          <textarea
            rows="5"
            value={formDescription || 'error'}
            {...register('description')}
            onChange={editDescription}
            type="text"
            className={css.textarea}
          ></textarea>
        </fieldset>
        <fieldset>
          <label>
            IsTestable?
            <input type="radio" aria-label="testable" />
          </label>
          <input
            type="checkbox"
            checked={formTestable}
            {...register('testable')}
            onChange={() => setFormTestable(toggleTestable)}
          />
        </fieldset>
        <button type="submit">Save Details</button>
      </form>
    </div>
  )
}

export default Details
