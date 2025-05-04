<script>
    export let hotline;
    let numberCopy = hotline.number;

    function copyToClipboard() {
        navigator.clipboard.writeText(numberCopy).then(()  => {
            alert('Number copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
</script>


<div class="hotline-card">
    <div class="title-icon">
        <h2>{hotline.name}</h2>
        <span class="icon">{hotline.icon}</span>
    </div>

    <div class="number">
        <h4>
            <strong>{hotline.number}</strong>
        </h4>
    </div>

    <div class="reason">
        <h5>For the following emergencies:</h5>
        <p>{hotline.reason}</p>
    </div>

    <p class="more-info">For more information, visit <a href={hotline.website}>their site here</a>.</p>
    
    <div class="buttons">
        <button class="copy-number" on:click={copyToClipboard}>
            Copy Number
        </button>
    </div>
</div>

<style>
    .hotline-card {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 16px;
        margin: 0;
        width: 100%;
        max-width: 400px;
        gap: 12px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;    
    }

    .title-icon {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .icon {
        font-size: 24px;
    }

    h2 {
        font-size: 20px;
    }

    .reason {
        padding: 16px;
        background-color: #f0f0f0;
        border-radius: 8px;
    }

    h5 {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 4px;
    }

    h4 {
        font-size: 18px;
        margin: 0;
    }

    .more-info {
        color: #8b8b8b;
    }

    a {
        color: #007bff;
        text-decoration: none;
    }

    .copy-number {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.2s ease-in-out;
    }
    .copy-number:hover {
        background-color: #0056b3;
    }
</style>