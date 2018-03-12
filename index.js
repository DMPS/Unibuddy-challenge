const fs = require("fs");

//Read the stream file
const streamFile = fs.readFileSync('./stream.txt', 'utf8');

//Parse the data into a nice object for me to iterate over
const data = streamFile.split(/\r?\n|\r/g).reduce((eventsObj, event) => {
    let eventArr = event.split('|')
    if (eventArr) {
        //check event type
        switch (eventArr[0]) {
            case 'User':
                eventsObj.users[eventArr[1]] = {
                    name: eventArr[1],
                    university: eventArr[2],
                    userType: eventArr[3]
                }
                break;
            case 'ChatGroup':
                eventsObj.chatGroups.push({
                    id: eventArr[1],
                    members: eventArr.splice(2),
                })
                break;
            case 'Message':
                eventsObj.messages.push({
                    name: eventArr[1],
                    chatGroup: eventArr[2],
                    text: eventArr[3],
                    time: new Date(eventArr[4])
                })
                break;
            default:
                break;
        }
    }
    return eventsObj
}, {
    users: {},
    chatGroups: [],
    messages: []
});

//Filter data by university
// console.log(data)
var filteredData = {
    users: {},
    chatGroups: [],
    messages: []
}
for (user in data.users) {
    if (data.users[user].university === "Edinburgh") {
        filteredData.users[user] = data.users[user]
    }
}
data.chatGroups.forEach(chatGroup => {
    for (let i = 0; i < chatGroup.members.length; i++) {
        if (!filteredData.users[chatGroup.members[i]]) return
    }
    for (let j = 0; j < chatGroup.members.length; j++) {
        if (filteredData.users[chatGroup.members[j]].userType === "Mentor" && chatGroup.members.length !== 1) {
            filteredData.chatGroups.push(chatGroup)
            break;
        }
    }
})

data.messages.forEach(message => {
    for (let i = 0; i < filteredData.chatGroups.length; i++) {
        if (filteredData.chatGroups[i].id === message.chatGroup) {
            filteredData.messages.push(message)
            break;
        }
    }
})

//now I need to iterate through the messages

function calcDateDiff(earlierTime,laterTime){
    return laterTime-earlierTime
}

function calcResponseTime(data, mentor) {
    let time = 0
    let groups = {}
    for (let i = 0; i < data.messages.length; i++) {
        const message = data.messages[i]
        if (!groups[message.chatGroup] && message.name !== mentor) {
            groups[message.chatGroup] = message.time
        }
        if(groups[message.chatGroup]&&message.name===mentor){
            time = calcDateDiff(groups[message.chatGroup],message.time)
        }
    }
    return `${mentor}: ${time} hours`
}

console.log(filteredData)