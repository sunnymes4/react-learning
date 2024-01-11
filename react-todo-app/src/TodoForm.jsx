import { useState } from 'react'

export function TodoForm({ submit }) {
    const [newItem, setNewItem] = useState('');

    // const [todos, setTodos] = useState([]);

    function handleSubmit(e) {
        e.preventDefault()
        submit(newItem);

        setNewItem("")
    }
    return (
        <form onSubmit={handleSubmit} className='new-item-form'>
            <div className='form-row'>
                <label htmlFor='item'>New Item</label>
                <input
                type="text"
                id='item'
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
                />
            </div>
            <button className='btn'>Add</button>
        </form>
    )
}