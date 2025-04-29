<script>
    let items = [];
    let newItem = '';
    let editIndex = null;

    function addItem() {
        if (newItem.trim() === '') return;
        if (editIndex !== null) {
            items[editIndex] = newItem;
            editIndex = null;
        } else {
            items.push(newItem);
        }
        newItem = '';
    }

    function editItem(index) {
        newItem = items[index];
        editIndex = index;
    }

    function deleteItem(index) {
        items = items.filter((_, i) => i !== index);
    }
</script>

<style>
    .crud-container {
        max-width: 400px;
        margin: 0 auto;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .crud-container h1 {
        text-align: center;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    .form-group input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .form-group button {
        margin-top: 0.5rem;
        padding: 0.5rem 1rem;
        border: none;
        background-color: #007bff;
        color: white;
        border-radius: 4px;
        cursor: pointer;
    }

    .form-group button:hover {
        background-color: #0056b3;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        border-bottom: 1px solid #ccc;
    }

    li button {
        margin-left: 0.5rem;
        padding: 0.25rem 0.5rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    li button.edit {
        background-color: #ffc107;
        color: white;
    }

    li button.edit:hover {
        background-color: #e0a800;
    }

    li button.delete {
        background-color: #dc3545;
        color: white;
    }

    li button.delete:hover {
        background-color: #c82333;
    }
</style>

<div class="crud-container">
    <h1>CRUD Example</h1>
    <div class="form-group">
        <input
            type="text"
            bind:value={newItem}
            placeholder="Enter item"
        />
        <button on:click={addItem}>
            {editIndex !== null ? 'Update' : 'Add'}
        </button>
    </div>
    <ul>
        {#each items as item, index}
            <li>
                {item}
                <div>
                    <button class="edit" on:click={() => editItem(index)}>Edit</button>
                    <button class="delete" on:click={() => deleteItem(index)}>Delete</button>
                </div>
            </li>
        {/each}
    </ul>
</div>