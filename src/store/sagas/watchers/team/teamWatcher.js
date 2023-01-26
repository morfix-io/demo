import { all, getContext } from 'redux-saga/effects'

export default function* teamWatcher() {
  const watchers = yield getContext('watchers')

  yield all([watchers.team.getUserTeamsWatcher(), watchers.team.createTeamWatcher(), watchers.team.deleteTeamWatcher()])
}
