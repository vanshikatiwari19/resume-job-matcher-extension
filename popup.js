async function analyze() {
    const fileInput = document.getElementById("resume");
    const file = fileInput.files[0];

    if (!file) {
        alert("Upload a file first!");
        return;
    }

    const text = await file.text();
    const resumeText = text.toLowerCase();

    const skills = ["python", "java", "c++", "react", "sql", "node", "html", "css", "javascript"];

    let found = [];

    skills.forEach(skill => {
        if (resumeText.includes(skill)) {
            found.push(skill);
        }
    });

    const jobs = {
        "Frontend Developer": ["html", "css", "javascript", "react"],
        "Backend Developer": ["python", "node", "sql"],
        "Software Engineer": ["c++", "java"]
    };

    let output = "";

    for (let job in jobs) {
        let required = jobs[job];

        let matched = required.filter(skill => found.includes(skill));
        let missing = required.filter(skill => !found.includes(skill));

        let percent = (matched.length / required.length) * 100;

        if (percent > 0) {
            output += `
                <div style="margin-bottom:10px;">
                    <b>${job}</b><br>
                    Match: ${percent.toFixed(0)}%<br>
                    ✅ Skills you have: ${matched.join(", ") || "None"}<br>
                    ❌ Missing skills: ${missing.join(", ") || "None"}
                </div>
            `;
        }
    }

    document.getElementById("result").innerHTML = output;
}