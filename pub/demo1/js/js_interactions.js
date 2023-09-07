$(document).ready(function () {
    var params = { "callback": "onContext" };
    smxProxy.sendRequest("get-context", null, "onContext");
});

function onContext(context) {
    var tree = JSONTree.create(context);
    $("#example").html(tree);


}

function handleClick() {
    smxProxy.sendRequest("run-readonly-command",
	    {"command" : "show gateways-and-servers","parameters" : {"details-level":"full"}},
	    "onReadOnlyCommand");
}

function onReadOnlyCommand(val) {
    var tree2 = JSONTree.create(val);
    $("#example2").html(tree2);
}