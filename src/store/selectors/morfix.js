import { createSelector } from 'reselect'

export const selectMorfixMessage = state => state.morfix.request.message
export const selectMorfixRequestState = state => state.morfix.request.loading
export const selectMorfixResponseStatusCode = state => state.morfix.request.statusCode
export const selectMorfixRequestSuccess = createSelector([selectMorfixResponseStatusCode], statusCode => {
  return /^2\d\d$/.test(statusCode)
})
export const selectMorfixEncParms = state => state.morfix.singletons.encParms
export const selectMorfixContext = state => state.morfix.singletons.context
export const selectMorfixKeyGenerator = state => state.morfix.singletons.keyGenerator
export const selectMorfixIntegerEncoder = state => state.morfix.singletons.integerEncoder
export const selectMorfixBatchEncoder = state => state.morfix.singletons.batchEncoder
export const selectMorfixCkksEncoder = state => state.morfix.singletons.ckksEncoder
export const selectMorfixEncryptor = state => state.morfix.singletons.encryptor
export const selectMorfixDecryptor = state => state.morfix.singletons.decryptor
export const selectMorfixEvaluator = state => state.morfix.singletons.evaluator

export const selectMorfixPublicKeys = state => state.morfix.keys.public
export const selectMorfixSecretKeys = state => state.morfix.keys.secret
export const selectMorfixRelinKeys = state => state.morfix.keys.relin
export const selectMorfixGaloisKeys = state => state.morfix.keys.galois

export const selectPlainTexts = state => state.morfix.plainText
export const selectCipherTexts = state => state.morfix.cipherText
export const selectPlainTextAllIds = state => state.morfix.plainText.allIds
export const selectPlainTextById = state => state.morfix.plainText.byId
export const selectCipherTextAllIds = state => state.morfix.cipherText.allIds
export const selectCipherTextById = state => state.morfix.cipherText.byId

export const selectMorfixEngineActions = state => state.morfix.actions
export const selectMorfixEngineActionsAllIds = state => state.morfix.actions.allIds
export const selectMorfixEngineActionsById = state => state.morfix.actions.byId
