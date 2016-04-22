var champions;

function onLoad()
{
    getChampions(false);
}

function insertChampion()
{
    var Champion, LaneID, RoleID;
    Champion = JSON.stringify($("#ChampionName").val());
    LaneID = $("#Lane option:selected").val();
    RoleID = $("#Role option:selected").val();
    ajax = ajaxInsertChampion("insertChampion", Champion, LaneID, RoleID);
    ajax.done(insertChampionCallback);
    ajax.fail(function(){
        alert("Failure");
    });
}

function ajaxInsertChampion(method, Champion, LaneID, RoleID)
{
    return $.ajax({
            url: 'ShadyAPI.php',
            type: 'POST',
            data: {method: method,
                Champion: Champion,
                LaneID: LaneID,
                RoleID: RoleID
            }
        });
}

function insertChampionCallback(response_in)
{
    response = JSON.parse(response_in);
    if (!response["success"])
    {
        $("#results").html("");
        alert("Insert failed on query:" + "\n" + response['querystring']);
    }
    else
    {
        $("#results").html(
                response['querystring'] + '<br>' +
                response['success'] + '<br>');
        getChampions(false);
    }
}

function showChampions()
{
    var championList = "";
    {
        $.each(champions, function (key, value)
        {
            var itemString = "";
            $.each(value, function (key, item)
            {
                itemString += "<td>&nbsp" + item + "&nbsp</td>";
            });
            championList += "<tr>&nbsp" + itemString + "&nbsp</tr>";
        });
        $("#champions").html("<table><tr><td>&nbspChampion&nbsp</td><td>&nbspLane&nbsp</td><td>&nbspRole&nbsp</td>" + championList + "</table>");
    }
}

function getChampions(async)
{
    ajax = ajaxGetChampions("getChampions", async);
    ajax.done(getChampionsCallback);
    ajax.fail(function (){
        alert("Failure");
    });
}

function ajaxGetChampions(method, async)
{
    return $.ajax({
        url: "ShadyAPI.php",
        type: 'POST',
        async: async,
        data: {method: method}
    });
}

function getChampionsCallback(response_in)
{
    var response = JSON.parse(response_in);
    champions = response["champions"];
    if(!response["champions"])
    {
        $("#results").html("getChampions failed");
    }
}