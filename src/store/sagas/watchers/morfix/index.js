import morfixWatcher from './morfixWatcher'

import createEncParmsWatcher from './createEncParmsWatcher'
import createContextWatcher from './createContextWatcher'
import createKeyGeneratorWatcher from './createKeyGeneratorWatcher'
import deletePublicKeyWatcher from './deletePublicKeyWatcher'
import deleteSecretKeyWatcher from './deleteSecretKeyWatcher'
import deleteRelinKeyWatcher from './deleteRelinKeyWatcher'
import deleteGaloisKeyWatcher from './deleteGaloisKeyWatcher'
import setActivePublicKeyWatcher from './setActivePublicKeyWatcher'
import setActiveSecretKeyWatcher from './setActiveSecretKeyWatcher'
import setActiveRelinKeyWatcher from './setActiveRelinKeyWatcher'
import setActiveGaloisKeyWatcher from './setActiveGaloisKeyWatcher'
import generatePublicKeyWatcher from './generatePublicKeyWatcher'
import generateSecretKeyWatcher from './generateSecretKeyWatcher'
import generateRelinKeyWatcher from './generateRelinKeyWatcher'
import generateGaloisKeyWatcher from './generateGaloisKeyWatcher'
import triggerDownloadWatcher from './triggerDownloadWatcher'
import downloadPublicKeyWatcher from './downloadPublicKeyWatcher'
import downloadSecretKeyWatcher from './downloadSecretKeyWatcher'
import downloadRelinKeyWatcher from './downloadRelinKeyWatcher'
import downloadGaloisKeyWatcher from './downloadGaloisKeyWatcher'
import uploadPublicKeyWatcher from './uploadPublicKeyWatcher'
import uploadSecretKeyWatcher from './uploadSecretKeyWatcher'
import uploadRelinKeyWatcher from './uploadRelinKeyWatcher'
import uploadGaloisKeyWatcher from './uploadGaloisKeyWatcher'
import createIntegerEncoderWatcher from './createIntegerEncoderWatcher'
import createBatchEncoderWatcher from './createBatchEncoderWatcher'
import createCkksEncoderWatcher from './createCkksEncoderWatcher'
import createEncryptorWatcher from './createEncryptorWatcher'
import createDecryptorWatcher from './createDecryptorWatcher'
import createEvaluatorWatcher from './createEvaluatorWatcher'
import batchEncodeInt32Watcher from './batchEncodeInt32Watcher'
import batchEncodeUint32Watcher from './batchEncodeUint32Watcher'
import ckksEncodeFloat64Watcher from './ckksEncodeFloat64Watcher'
import batchDecodeInt32Watcher from './batchDecodeInt32Watcher'
import batchDecodeUint32Watcher from './batchDecodeUint32Watcher'
import ckksDecodeFloat64Watcher from './ckksDecodeFloat64Watcher'
import createPlainTextWatcher from './createPlainTextWatcher'
import readPlainTextWatcher from './readPlainTextWatcher'
import updatePlainTextWatcher from './updatePlainTextWatcher'
import deletePlainTextWatcher from './deletePlainTextWatcher'
import downloadPlainTextWatcher from './downloadPlainTextWatcher'
import uploadPlainTextWatcher from './uploadPlainTextWatcher'
import loadPlainTextWatcher from './loadPlainTextWatcher'
import createCipherTextWatcher from './createCipherTextWatcher'
import readCipherTextWatcher from './readCipherTextWatcher'
import updateCipherTextWatcher from './updateCipherTextWatcher'
import deleteCipherTextWatcher from './deleteCipherTextWatcher'
import downloadCipherTextWatcher from './downloadCipherTextWatcher'
import uploadCipherTextWatcher from './uploadCipherTextWatcher'
import loadCipherTextWatcher from './loadCipherTextWatcher'
import encryptWatcher from './encryptWatcher'
import decryptWatcher from './decryptWatcher'
import engineCreateActionWatcher from './engineCreateActionWatcher'
import engineUpdateActionWatcher from './engineUpdateActionWatcher'
import engineDeleteActionWatcher from './engineDeleteActionWatcher'
import engineExecuteAllActionsWatcher from './engineExecuteAllActionsWatcher'
import evaluateNegateCipherWatcher from './evaluateNegateCipherWatcher'
import evaluateAddPlainToCipherWatcher from './evaluateAddPlainToCipherWatcher'
import evaluateAddCipherToCipherWatcher from './evaluateAddCipherToCipherWatcher'
import evaluateSubCipherFromCipherWatcher from './evaluateSubCipherFromCipherWatcher'
import evaluateSubPlainFromCipherWatcher from './evaluateSubPlainFromCipherWatcher'
import evaluateMultiplyCipherByCipherWatcher from './evaluateMultiplyCipherByCipherWatcher'
import evaluateMultiplyCipherByPlainWatcher from './evaluateMultiplyCipherByPlainWatcher'
import evaluateSquareCipherWatcher from './evaluateSquareCipherWatcher'
import evaluateRelinearizeCipherWatcher from './evaluateRelinearizeCipherWatcher'
import evaluateExponentiateCipherWatcher from './evaluateExponentiateCipherWatcher'
import evaluateCipherModulusSwitchToNextWatcher from './evaluateCipherModulusSwitchToNextWatcher'
import evaluatePlainModulusSwitchToNextWatcher from './evaluatePlainModulusSwitchToNextWatcher'
import evaluateCipherRescaleToNextWatcher from './evaluateCipherRescaleToNextWatcher'
import evaluatePlainTransformToNTTWatcher from './evaluatePlainTransformToNTTWatcher'
import evaluateCipherTransformToNTTWatcher from './evaluateCipherTransformToNTTWatcher'
import evaluateCipherTransformFromNTTWatcher from './evaluateCipherTransformFromNTTWatcher'
import evaluateRotateRowsWatcher from './evaluateRotateRowsWatcher'
import evaluateRotateColumnsWatcher from './evaluateRotateColumnsWatcher'
import evaluateRotateVectorWatcher from './evaluateRotateVectorWatcher'
import evaluateComplexConjugateWatcher from './evaluateComplexConjugateWatcher'
import evaluateSumElementsWatcher from './evaluateSumElementsWatcher'
import evaluateDotProductWatcher from './evaluateDotProductWatcher'
import evaluateDotProductPlainWatcher from './evaluateDotProductPlainWatcher'

export default {
  createEncParmsWatcher,
  createContextWatcher,
  createKeyGeneratorWatcher,
  deletePublicKeyWatcher,
  deleteSecretKeyWatcher,
  deleteRelinKeyWatcher,
  deleteGaloisKeyWatcher,
  setActivePublicKeyWatcher,
  setActiveSecretKeyWatcher,
  setActiveRelinKeyWatcher,
  setActiveGaloisKeyWatcher,
  generatePublicKeyWatcher,
  generateSecretKeyWatcher,
  generateRelinKeyWatcher,
  generateGaloisKeyWatcher,
  triggerDownloadWatcher,
  downloadPublicKeyWatcher,
  downloadSecretKeyWatcher,
  downloadRelinKeyWatcher,
  downloadGaloisKeyWatcher,
  uploadPublicKeyWatcher,
  uploadSecretKeyWatcher,
  uploadRelinKeyWatcher,
  uploadGaloisKeyWatcher,
  createIntegerEncoderWatcher,
  createBatchEncoderWatcher,
  createCkksEncoderWatcher,
  createEncryptorWatcher,
  createDecryptorWatcher,
  createEvaluatorWatcher,
  batchEncodeInt32Watcher,
  batchEncodeUint32Watcher,
  ckksEncodeFloat64Watcher,
  batchDecodeInt32Watcher,
  batchDecodeUint32Watcher,
  ckksDecodeFloat64Watcher,
  createPlainTextWatcher,
  readPlainTextWatcher,
  updatePlainTextWatcher,
  deletePlainTextWatcher,
  downloadPlainTextWatcher,
  uploadPlainTextWatcher,
  loadPlainTextWatcher,
  createCipherTextWatcher,
  readCipherTextWatcher,
  updateCipherTextWatcher,
  deleteCipherTextWatcher,
  downloadCipherTextWatcher,
  uploadCipherTextWatcher,
  loadCipherTextWatcher,
  encryptWatcher,
  decryptWatcher,
  engineCreateActionWatcher,
  engineUpdateActionWatcher,
  engineDeleteActionWatcher,
  engineExecuteAllActionsWatcher,
  evaluateNegateCipherWatcher,
  evaluateAddCipherToCipherWatcher,
  evaluateAddPlainToCipherWatcher,
  evaluateSubCipherFromCipherWatcher,
  evaluateSubPlainFromCipherWatcher,
  evaluateMultiplyCipherByCipherWatcher,
  evaluateMultiplyCipherByPlainWatcher,
  evaluateSquareCipherWatcher,
  evaluateRelinearizeCipherWatcher,
  evaluateExponentiateCipherWatcher,
  evaluateCipherModulusSwitchToNextWatcher,
  evaluatePlainModulusSwitchToNextWatcher,
  evaluateCipherRescaleToNextWatcher,
  evaluatePlainTransformToNTTWatcher,
  evaluateCipherTransformToNTTWatcher,
  evaluateCipherTransformFromNTTWatcher,
  evaluateRotateRowsWatcher,
  evaluateRotateColumnsWatcher,
  evaluateRotateVectorWatcher,
  evaluateComplexConjugateWatcher,
  evaluateSumElementsWatcher,
  evaluateDotProductWatcher,
  evaluateDotProductPlainWatcher,
  main: morfixWatcher
}
