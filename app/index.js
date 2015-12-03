var app = window.angular.module('app', [])

app.factory('chat', chat)
app.controller('mainCtrl', mainCtrl)
app.directive('message', message)
app.value('db', {})

var objToArray = function (obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key]
  })
}

function chat ($http, db) {

  return {
    send: function (msg) {},

    onNewMsg: function (fn) {}
  }

}

function mainCtrl ($scope, chat) {
  $scope.username = ''
  $scope.msgs = []
  $scope.joinChat = joinChat
  $scope.sendMessage = sendMessage

  chat.onNewMsg(displayNewMsg)

  function sendMessage (form) {
    if (!form.body) return

    chat.send(form.body)
    form.body = ''
  }

  function joinChat (form) {
    $scope.username = form.username
  }

  function displayNewMsg (msg) {
    $scope.msgs = objToArray(msg)
    maybeApply($scope)
    window.scrollTo(0, document.body.scrollHeight)
  }

}

function message () {
  return {
    scope: {
      body: '=' /* [1] */
    },
    restrict: 'E', /* [2] */
    template: (
      '<div class="Message">' +
        '{{body}}' +
      '</div>'
    ) /* [3] */
  }
}

function maybeApply (scope) {
  if (!scope.$$phase) scope.$apply()
}
