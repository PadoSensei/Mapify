import css from "./details.module.css";

// TODO - Connect delected Node to details component
    // Wire up form for updates.

function Details({targetMap}) {
    const { data } = targetMap
    //console.log(data)
    // if (!data){
    //     const data = {
    //         mapId: "error",
    //         level: "error",
    //         name: "error",
    //         comment: "error"
    //     }
    // }
    return (
        <div className={css.container}>
            <h2>
                Node ID: 
                {data.mapId || "error"}
            </h2>
            <form>
                <fieldset>
                    <label>mapId</label>
                    <input 
                        className={css.input} 
                        defaultValue={targetMap.id} 
                        disabled type="text" 
                    />
                </fieldset>
                <fieldset>
                    <label>Level</label>
                    <input 
                        className={css.input} 
                        //defaultValue={data.level || "error"} 
                        disabled type="text" 
                    />
                </fieldset>
                <fieldset>
                    <label>Name</label>
                    <input 
                        className={css.input}
                        //onChange={targetMap.onChangeName}
                        defaultValue={data.name || "error"} 
                        type="text" 
                    />
                </fieldset>
                <fieldset>
                    <label>Comment</label>
                    <textarea rows="10"
                        //onChange={targetMap.onChangeComment}
                        //defaultValue={data.comment || "error"} 
                        className={css.textarea}>
                        </textarea>
                </fieldset>
            </form>
        </div>
    );
}

export default Details;