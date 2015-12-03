var app = window.angular.module('app', [])

app.factory('chat', chat)
app.controller('mainCtrl', mainCtrl)
app.directive('message', message)
app.value('db', function () {})

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
  $scope.msgs = []
  $scope.sendMessage = sendMessage

  chat.onNewMsg(displayNewMsg)

  function sendMessage (form) {
    if (!form.body) return

    chat.send(form.body)
    form.body = ''
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
      body: '='
    },
    restrict: 'E',
    template: (
      '<div class="Message">' +
        '{{body}}' +
      '</div>'
    )
  }
}

function maybeApply (scope) {
  if (!scope.$$phase) scope.$apply()
}
