$(document).ready(function () {
    var params = { "callback": "onContext" };
    try {
        smxProxy.sendRequest("get-context", null, "onContext");
    } catch (err) {
        console.error(err)
    }
});

function onContext(context) {
    const tree = JSONTree.create(context);
    $("#example").html(tree);
    log(`\n onContext ${JSON.stringify(context, null, 2)}`);

    if (context && context.event) {
        const rulebaseContext = getRulebaseContext(context.event);
        console.log(rulebaseContext);

        if (rulebaseContext) {
            showAccessRulebase(rulebaseContext.accessPolicy, rulebaseContext.accessLayer);
        }
    }
}

function log(txt) {
    document.getElementById("log").innerText =
        document.getElementById("log").innerText + txt;
}

function getRulebaseContext(event) {
    let accessLayer = null;
    let accessPolicy = null;
    if (event) {
        if (event["trigger-id"]) {
            if (event["trigger-id"] === "details-pane") {
                if (event["objects"]) {
                    console.log(event["objects"].name, event["objects"].type)
                    for (let object of event["objects"]) {
                        if (object["type"] === "access-layer") {
                            accessLayer = object.uid;
                        }
                        if (object["type"] === "AccessPolicy") {
                            accessPolicy = object.name;
                        }
                    }
                    if (accessLayer && accessPolicy) {
                        log(`\n\n accessLayer: ${accessLayer} accessPolicy: ${accessPolicy}`)
                        return { "accessLayer": accessLayer, "accessPolicy": accessPolicy };
                    }
                }
            }
        }
    }
    return null;
}

function handleClick() {

    try {
        smxProxy.sendRequest("run-readonly-command",
            { "command": "show gateways-and-servers", "parameters": { "details-level": "full" } },
            "onReadOnlyCommand");
    } catch (err) {
        console.error(err);
    }





}

function showAccessRulebase(accessPolicy, accessLayer) {
    try {
        smxProxy.sendRequest("run-readonly-command",
            {
                "command": "show access-rulebase", "parameters": {
                    "details-level": "full",
                    "uid": accessLayer,
                    "package": accessPolicy,
                    "filter": "DNS"
                }
            },
            "onShowAccessRulebase");
    } catch (err) {
        console.error(err);
    }
}

function onShowAccessRulebase(val) {
    log(`\n onShowAccessRulebase ${JSON.stringify(val, null, 2)}`);
}

function onReadOnlyCommand(val) {
    const tree2 = JSONTree.create(val);
    $("#example2").html(tree2);
    log(`\n onReadOnlyCommand ${JSON.stringify(val, null, 2)}`);
}