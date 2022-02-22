import css from "./details.module.css";

function Details({targetMap}) {
    return (
        <div className={css.container}>
            <h2>Details ID{targetMap.id}</h2>
            <form>
                <fieldset>
                    <label>ID</label>
                    <input className={css.input} defaultValue={targetMap.id} disabled type="text" />
                </fieldset>
                <fieldset>
                    <label>Level</label>
                    <input className={css.input} defaultValue={targetMap.level} disabled type="text" />
                </fieldset>
                <fieldset>
                    <label>Name</label>
                    <input className={css.input}
                        onChange={targetMap.onChangeName}
                        defaultValue={targetMap.name} type="text" />
                </fieldset>
                <fieldset>
                    <label>Comment</label>
                    <textarea rows="10"
                        onChange={targetMap.onChangeComment}
                        defaultValue={targetMap.comment} className={css.textarea}></textarea>
                </fieldset>
            </form>
        </div>
    );
}

export default Details;