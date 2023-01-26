import { put } from 'redux-saga/effects'
import { morfixTriggerDownloadSuccess, morfixTriggerDownloadFailure } from 'store/actions/morfix'

export default function* triggerDownloadWorker(action) {
  try {
    const { url, fileName } = action.payload

    if (!url || !fileName) {
      yield put(morfixTriggerDownloadSuccess())
      return
    }

    const a = document.createElement('a')
    a.style.display = 'none'
    document.body.appendChild(a)

    // Set the HREF to a Blob representation of the data to be downloaded
    a.href = url

    // Use download attribute to set set desired file name
    a.setAttribute('download', fileName)

    // Trigger the download by simulating click
    a.click()

    // Cleanup
    window.URL.revokeObjectURL(a.href)

    yield put(morfixTriggerDownloadSuccess())
  } catch (error) {
    yield put(morfixTriggerDownloadFailure(error.payload ? error.payload : error))
  }
}
