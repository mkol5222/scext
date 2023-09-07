$(document).ready(function () {
    var params = { "callback": "onContext" };
    smxProxy.sendRequest("get-context", null, "onContext");
});

function onContext(context) {
    const tree = JSONTree.create(context);
    $("#example").html(tree);
    log(`\n onContext ${JSON.stringify(context, null, 2)}`);
}

function log(txt) {
    document.getElementById("log").innerText = 
    document.getElementById("log").innerText + txt;
}

function handleClick() {
    alert('hello');
    smxProxy.sendRequest("run-readonly-command",
        { "command": "show gateways-and-servers", "parameters": { "details-level": "full" } },
        "onReadOnlyCommand");
}

function onReadOnlyCommand(val) {
    const tree2 = JSONTree.create(val);
    $("#example2").html(tree2);
    log(`\n onReadOnlyCommand ${JSON.stringify(val, null, 2)}`);
}