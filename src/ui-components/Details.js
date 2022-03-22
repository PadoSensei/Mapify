import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import css from "./details.module.css";
import { updateMapNode } from '../store/mindMapReducer';
import { useStore } from '../store/Store'


// TODO - Connect delected Node to details component
    // Wire up form for updates.

function Details({targetMap}) {
    const { data } = targetMap
    const [state, dispatch] = useStore();
    const { register, handleSubmit } = useForm();
    const[formName, setFormName ] = useState("")
    const[formDescription, setFormDescription ] = useState(targetMap.data.description)
    const[formTestable, setFormTestable ] = useState(data.testable)
    
    function onSubmit (formData) {
        const payload = {
            mapId: parseInt(targetMap.mapId),
            nodeId: targetMap.id,
            data: formData
        }
        console.log(payload, "payload sent to reducer");
        dispatch(updateMapNode(payload))
    } 

    function toggleTestable(bool){
        return !bool
    }

    useEffect(() => {
        setFormDescription(targetMap.data.description)
        setFormTestable(data.testable)
    },[targetMap])
        
    // const changeName = (e) => {
    //         const name = e.target.value;
    //     console.log(e.target)
    //     setFormName(name)
    //     }

    const editDescription = (e) => {
        const description = e.target.value;
        setFormDescription(description)
    }


    
    return (
        <div className={css.container}>
            <h2> 
                {data.label || "Empty or error"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label>mapId - same for each node</label>
                    <input 
                        className={css.input} 
                        value={targetMap.mapId || "error"} 
                        disabled type="text" 
                    />
                </fieldset>
                <fieldset>
                    <label>nodeId - unique to node</label>
                    <input 
                        className={css.input} 
                        value={targetMap.id || "error"} 
                        disabled type="text" 
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
                    <label>Description</label>
                    <textarea rows="5"
                        value={formDescription|| "error"}
                        {...register("description")} 
                        onChange={editDescription}
                        type="text" 
                        className={css.textarea}>
                        </textarea>
                </fieldset>
                <fieldset>
                    <label>IsTestable?</label>
                    <input 
                        type="checkbox" 
                        checked={formTestable} 
                        {...register("testable")}
                        onChange={() => setFormTestable(toggleTestable)} 
                    />
                </fieldset>
                <button type="submit" >Save Details</button>
            </form>
        </div>
    );
}

export default Details;