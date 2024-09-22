document.addEventListener("DOMContentLoaded", function () {
    // Add a copy button to each <pre> block
    document.querySelectorAll("pre").forEach(function (pre) {
        const button = document.createElement("button");
        button.className = "copy-button";
        button.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';


        // Append the button to the pre block
        pre.appendChild(button);

        // Add click event to copy the code content
        button.addEventListener("click", function () {
            const code = pre.querySelector("code").innerText;

            // Create a temporary textarea element to copy text from
            const tempTextarea = document.createElement("textarea");
            tempTextarea.value = code;
            document.body.appendChild(tempTextarea);
            tempTextarea.select();
            document.execCommand("copy");
            document.body.removeChild(tempTextarea);

            // Change button text to indicate success
            button.innerText = "Copied!";
            setTimeout(() => { button.innerText = "Copy"; }, 2000);
        });
    });
});