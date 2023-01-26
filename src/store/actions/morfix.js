import { createActionCreator } from 'store/utils'
import {
  MORFIX_CREATE_ENC_PARMS_REQUEST,
  MORFIX_CREATE_ENC_PARMS_SUCCESS,
  MORFIX_CREATE_ENC_PARMS_FAILURE,
  MORFIX_CREATE_CONTEXT_REQUEST,
  MORFIX_CREATE_CONTEXT_SUCCESS,
  MORFIX_CREATE_CONTEXT_FAILURE,
  MORFIX_CREATE_KEY_GENERATOR_REQUEST,
  MORFIX_CREATE_KEY_GENERATOR_SUCCESS,
  MORFIX_CREATE_KEY_GENERATOR_FAILURE,
  MORFIX_DELETE_PUBLIC_KEY_REQUEST,
  MORFIX_DELETE_PUBLIC_KEY_SUCCESS,
  MORFIX_DELETE_PUBLIC_KEY_FAILURE,
  MORFIX_DELETE_SECRET_KEY_REQUEST,
  MORFIX_DELETE_SECRET_KEY_SUCCESS,
  MORFIX_DELETE_SECRET_KEY_FAILURE,
  MORFIX_DELETE_RELIN_KEY_REQUEST,
  MORFIX_DELETE_RELIN_KEY_SUCCESS,
  MORFIX_DELETE_RELIN_KEY_FAILURE,
  MORFIX_DELETE_GALOIS_KEY_REQUEST,
  MORFIX_DELETE_GALOIS_KEY_SUCCESS,
  MORFIX_DELETE_GALOIS_KEY_FAILURE,
  MORFIX_SET_ACTIVE_PUBLIC_KEY_REQUEST,
  MORFIX_SET_ACTIVE_PUBLIC_KEY_SUCCESS,
  MORFIX_SET_ACTIVE_PUBLIC_KEY_FAILURE,
  MORFIX_SET_ACTIVE_SECRET_KEY_REQUEST,
  MORFIX_SET_ACTIVE_SECRET_KEY_SUCCESS,
  MORFIX_SET_ACTIVE_SECRET_KEY_FAILURE,
  MORFIX_SET_ACTIVE_RELIN_KEY_REQUEST,
  MORFIX_SET_ACTIVE_RELIN_KEY_SUCCESS,
  MORFIX_SET_ACTIVE_RELIN_KEY_FAILURE,
  MORFIX_SET_ACTIVE_GALOIS_KEY_REQUEST,
  MORFIX_SET_ACTIVE_GALOIS_KEY_SUCCESS,
  MORFIX_SET_ACTIVE_GALOIS_KEY_FAILURE,
  MORFIX_GENERATE_PUBLIC_KEY_REQUEST,
  MORFIX_GENERATE_PUBLIC_KEY_SUCCESS,
  MORFIX_GENERATE_PUBLIC_KEY_FAILURE,
  MORFIX_GENERATE_SECRET_KEY_REQUEST,
  MORFIX_GENERATE_SECRET_KEY_SUCCESS,
  MORFIX_GENERATE_SECRET_KEY_FAILURE,
  MORFIX_GENERATE_RELIN_KEY_REQUEST,
  MORFIX_GENERATE_RELIN_KEY_SUCCESS,
  MORFIX_GENERATE_RELIN_KEY_FAILURE,
  MORFIX_GENERATE_GALOIS_KEY_REQUEST,
  MORFIX_GENERATE_GALOIS_KEY_SUCCESS,
  MORFIX_GENERATE_GALOIS_KEY_FAILURE,
  MORFIX_TRIGGER_DOWNLOAD_REQUEST,
  MORFIX_TRIGGER_DOWNLOAD_SUCCESS,
  MORFIX_TRIGGER_DOWNLOAD_FAILURE,
  MORFIX_DOWNLOAD_PUBLIC_KEY_REQUEST,
  MORFIX_DOWNLOAD_PUBLIC_KEY_SUCCESS,
  MORFIX_DOWNLOAD_PUBLIC_KEY_FAILURE,
  MORFIX_DOWNLOAD_SECRET_KEY_REQUEST,
  MORFIX_DOWNLOAD_SECRET_KEY_SUCCESS,
  MORFIX_DOWNLOAD_SECRET_KEY_FAILURE,
  MORFIX_DOWNLOAD_RELIN_KEY_REQUEST,
  MORFIX_DOWNLOAD_RELIN_KEY_SUCCESS,
  MORFIX_DOWNLOAD_RELIN_KEY_FAILURE,
  MORFIX_DOWNLOAD_GALOIS_KEY_REQUEST,
  MORFIX_DOWNLOAD_GALOIS_KEY_SUCCESS,
  MORFIX_DOWNLOAD_GALOIS_KEY_FAILURE,
  MORFIX_UPLOAD_PUBLIC_KEY_REQUEST,
  MORFIX_UPLOAD_PUBLIC_KEY_SUCCESS,
  MORFIX_UPLOAD_PUBLIC_KEY_FAILURE,
  MORFIX_UPLOAD_SECRET_KEY_REQUEST,
  MORFIX_UPLOAD_SECRET_KEY_SUCCESS,
  MORFIX_UPLOAD_SECRET_KEY_FAILURE,
  MORFIX_UPLOAD_RELIN_KEY_REQUEST,
  MORFIX_UPLOAD_RELIN_KEY_SUCCESS,
  MORFIX_UPLOAD_RELIN_KEY_FAILURE,
  MORFIX_UPLOAD_GALOIS_KEY_REQUEST,
  MORFIX_UPLOAD_GALOIS_KEY_SUCCESS,
  MORFIX_UPLOAD_GALOIS_KEY_FAILURE,
  MORFIX_CREATE_INTEGER_ENCODER_REQUEST,
  MORFIX_CREATE_INTEGER_ENCODER_SUCCESS,
  MORFIX_CREATE_INTEGER_ENCODER_FAILURE,
  MORFIX_CREATE_BATCH_ENCODER_REQUEST,
  MORFIX_CREATE_BATCH_ENCODER_SUCCESS,
  MORFIX_CREATE_BATCH_ENCODER_FAILURE,
  MORFIX_CREATE_CKKS_ENCODER_REQUEST,
  MORFIX_CREATE_CKKS_ENCODER_SUCCESS,
  MORFIX_CREATE_CKKS_ENCODER_FAILURE,
  MORFIX_CREATE_ENCRYPTOR_REQUEST,
  MORFIX_CREATE_ENCRYPTOR_SUCCESS,
  MORFIX_CREATE_ENCRYPTOR_FAILURE,
  MORFIX_CREATE_DECRYPTOR_REQUEST,
  MORFIX_CREATE_DECRYPTOR_SUCCESS,
  MORFIX_CREATE_DECRYPTOR_FAILURE,
  MORFIX_DELETE_ENCRYPTOR_REQUEST,
  MORFIX_DELETE_ENCRYPTOR_SUCCESS,
  MORFIX_DELETE_ENCRYPTOR_FAILURE,
  MORFIX_DELETE_DECRYPTOR_REQUEST,
  MORFIX_DELETE_DECRYPTOR_SUCCESS,
  MORFIX_DELETE_DECRYPTOR_FAILURE,
  MORFIX_CREATE_EVALUATOR_REQUEST,
  MORFIX_CREATE_EVALUATOR_SUCCESS,
  MORFIX_CREATE_EVALUATOR_FAILURE,
  MORFIX_CREATE_PLAIN_TEXT_REQUEST,
  MORFIX_CREATE_PLAIN_TEXT_SUCCESS,
  MORFIX_CREATE_PLAIN_TEXT_FAILURE,
  MORFIX_READ_PLAIN_TEXT_REQUEST,
  MORFIX_READ_PLAIN_TEXT_SUCCESS,
  MORFIX_READ_PLAIN_TEXT_FAILURE,
  MORFIX_UPDATE_PLAIN_TEXT_REQUEST,
  MORFIX_UPDATE_PLAIN_TEXT_SUCCESS,
  MORFIX_UPDATE_PLAIN_TEXT_FAILURE,
  MORFIX_DELETE_PLAIN_TEXT_REQUEST,
  MORFIX_DELETE_PLAIN_TEXT_SUCCESS,
  MORFIX_DELETE_PLAIN_TEXT_FAILURE,
  MORFIX_DOWNLOAD_PLAIN_TEXT_REQUEST,
  MORFIX_DOWNLOAD_PLAIN_TEXT_SUCCESS,
  MORFIX_DOWNLOAD_PLAIN_TEXT_FAILURE,
  MORFIX_UPLOAD_PLAIN_TEXT_REQUEST,
  MORFIX_UPLOAD_PLAIN_TEXT_SUCCESS,
  MORFIX_UPLOAD_PLAIN_TEXT_FAILURE,
  MORFIX_LOAD_PLAIN_TEXT_REQUEST,
  MORFIX_LOAD_PLAIN_TEXT_SUCCESS,
  MORFIX_LOAD_PLAIN_TEXT_FAILURE,
  MORFIX_CREATE_CIPHER_TEXT_REQUEST,
  MORFIX_CREATE_CIPHER_TEXT_SUCCESS,
  MORFIX_CREATE_CIPHER_TEXT_FAILURE,
  MORFIX_READ_CIPHER_TEXT_REQUEST,
  MORFIX_READ_CIPHER_TEXT_SUCCESS,
  MORFIX_READ_CIPHER_TEXT_FAILURE,
  MORFIX_UPDATE_CIPHER_TEXT_REQUEST,
  MORFIX_UPDATE_CIPHER_TEXT_SUCCESS,
  MORFIX_UPDATE_CIPHER_TEXT_FAILURE,
  MORFIX_DELETE_CIPHER_TEXT_REQUEST,
  MORFIX_DELETE_CIPHER_TEXT_SUCCESS,
  MORFIX_DELETE_CIPHER_TEXT_FAILURE,
  MORFIX_DOWNLOAD_CIPHER_TEXT_REQUEST,
  MORFIX_DOWNLOAD_CIPHER_TEXT_SUCCESS,
  MORFIX_DOWNLOAD_CIPHER_TEXT_FAILURE,
  MORFIX_UPLOAD_CIPHER_TEXT_REQUEST,
  MORFIX_UPLOAD_CIPHER_TEXT_SUCCESS,
  MORFIX_UPLOAD_CIPHER_TEXT_FAILURE,
  MORFIX_LOAD_CIPHER_TEXT_REQUEST,
  MORFIX_LOAD_CIPHER_TEXT_SUCCESS,
  MORFIX_LOAD_CIPHER_TEXT_FAILURE,
  MORFIX_BATCH_ENCODE_INT32_REQUEST,
  MORFIX_BATCH_ENCODE_INT32_SUCCESS,
  MORFIX_BATCH_ENCODE_INT32_FAILURE,
  MORFIX_BATCH_ENCODE_UINT32_REQUEST,
  MORFIX_BATCH_ENCODE_UINT32_SUCCESS,
  MORFIX_BATCH_ENCODE_UINT32_FAILURE,
  MORFIX_CKKS_ENCODE_FLOAT64_REQUEST,
  MORFIX_CKKS_ENCODE_FLOAT64_SUCCESS,
  MORFIX_CKKS_ENCODE_FLOAT64_FAILURE,
  MORFIX_BATCH_DECODE_INT32_REQUEST,
  MORFIX_BATCH_DECODE_INT32_SUCCESS,
  MORFIX_BATCH_DECODE_INT32_FAILURE,
  MORFIX_BATCH_DECODE_UINT32_REQUEST,
  MORFIX_BATCH_DECODE_UINT32_SUCCESS,
  MORFIX_BATCH_DECODE_UINT32_FAILURE,
  MORFIX_CKKS_DECODE_FLOAT64_REQUEST,
  MORFIX_CKKS_DECODE_FLOAT64_SUCCESS,
  MORFIX_CKKS_DECODE_FLOAT64_FAILURE,
  MORFIX_ENCRYPT_REQUEST,
  MORFIX_ENCRYPT_SUCCESS,
  MORFIX_ENCRYPT_FAILURE,
  MORFIX_DECRYPT_REQUEST,
  MORFIX_DECRYPT_SUCCESS,
  MORFIX_DECRYPT_FAILURE,
  MORFIX_ENGINE_CREATE_ACTION_REQUEST,
  MORFIX_ENGINE_CREATE_ACTION_SUCCESS,
  MORFIX_ENGINE_CREATE_ACTION_FAILURE,
  MORFIX_ENGINE_UPDATE_ACTION_REQUEST,
  MORFIX_ENGINE_UPDATE_ACTION_SUCCESS,
  MORFIX_ENGINE_UPDATE_ACTION_FAILURE,
  MORFIX_ENGINE_DELETE_ACTION_REQUEST,
  MORFIX_ENGINE_DELETE_ACTION_SUCCESS,
  MORFIX_ENGINE_DELETE_ACTION_FAILURE,
  MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_REQUEST,
  MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_SUCCESS,
  MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_FAILURE,
  MORFIX_EVALUATE_NEGATE_CIPHER_REQUEST,
  MORFIX_EVALUATE_NEGATE_CIPHER_SUCCESS,
  MORFIX_EVALUATE_NEGATE_CIPHER_FAILURE,
  MORFIX_EVALUATE_ADD_CIPHER_TO_CIPHER_REQUEST,
  MORFIX_EVALUATE_ADD_CIPHER_TO_CIPHER_SUCCESS,
  MORFIX_EVALUATE_ADD_CIPHER_TO_CIPHER_FAILURE,
  MORFIX_EVALUATE_ADD_PLAIN_TO_CIPHER_REQUEST,
  MORFIX_EVALUATE_ADD_PLAIN_TO_CIPHER_SUCCESS,
  MORFIX_EVALUATE_ADD_PLAIN_TO_CIPHER_FAILURE,
  MORFIX_EVALUATE_SUB_CIPHER_FROM_CIPHER_REQUEST,
  MORFIX_EVALUATE_SUB_CIPHER_FROM_CIPHER_SUCCESS,
  MORFIX_EVALUATE_SUB_CIPHER_FROM_CIPHER_FAILURE,
  MORFIX_EVALUATE_SUB_PLAIN_FROM_CIPHER_REQUEST,
  MORFIX_EVALUATE_SUB_PLAIN_FROM_CIPHER_SUCCESS,
  MORFIX_EVALUATE_SUB_PLAIN_FROM_CIPHER_FAILURE,
  MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_CIPHER_REQUEST,
  MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_CIPHER_SUCCESS,
  MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_CIPHER_FAILURE,
  MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_PLAIN_REQUEST,
  MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_PLAIN_SUCCESS,
  MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_PLAIN_FAILURE,
  MORFIX_EVALUATE_SQUARE_CIPHER_REQUEST,
  MORFIX_EVALUATE_SQUARE_CIPHER_SUCCESS,
  MORFIX_EVALUATE_SQUARE_CIPHER_FAILURE,
  MORFIX_EVALUATE_RELINEARIZE_CIPHER_REQUEST,
  MORFIX_EVALUATE_RELINEARIZE_CIPHER_SUCCESS,
  MORFIX_EVALUATE_RELINEARIZE_CIPHER_FAILURE,
  MORFIX_EVALUATE_EXPONENTIATE_CIPHER_REQUEST,
  MORFIX_EVALUATE_EXPONENTIATE_CIPHER_SUCCESS,
  MORFIX_EVALUATE_EXPONENTIATE_CIPHER_FAILURE,
  MORFIX_EVALUATE_CIPHER_MODULUS_SWITCH_TO_NEXT_REQUEST,
  MORFIX_EVALUATE_CIPHER_MODULUS_SWITCH_TO_NEXT_SUCCESS,
  MORFIX_EVALUATE_CIPHER_MODULUS_SWITCH_TO_NEXT_FAILURE,
  MORFIX_EVALUATE_PLAIN_MODULUS_SWITCH_TO_NEXT_REQUEST,
  MORFIX_EVALUATE_PLAIN_MODULUS_SWITCH_TO_NEXT_SUCCESS,
  MORFIX_EVALUATE_PLAIN_MODULUS_SWITCH_TO_NEXT_FAILURE,
  MORFIX_EVALUATE_CIPHER_RESCALE_TO_NEXT_REQUEST,
  MORFIX_EVALUATE_CIPHER_RESCALE_TO_NEXT_SUCCESS,
  MORFIX_EVALUATE_CIPHER_RESCALE_TO_NEXT_FAILURE,
  MORFIX_EVALUATE_PLAIN_TRANSFORM_TO_NTT_REQUEST,
  MORFIX_EVALUATE_PLAIN_TRANSFORM_TO_NTT_SUCCESS,
  MORFIX_EVALUATE_PLAIN_TRANSFORM_TO_NTT_FAILURE,
  MORFIX_EVALUATE_CIPHER_TRANSFORM_TO_NTT_REQUEST,
  MORFIX_EVALUATE_CIPHER_TRANSFORM_TO_NTT_SUCCESS,
  MORFIX_EVALUATE_CIPHER_TRANSFORM_TO_NTT_FAILURE,
  MORFIX_EVALUATE_CIPHER_TRANSFORM_FROM_NTT_REQUEST,
  MORFIX_EVALUATE_CIPHER_TRANSFORM_FROM_NTT_SUCCESS,
  MORFIX_EVALUATE_CIPHER_TRANSFORM_FROM_NTT_FAILURE,
  MORFIX_EVALUATE_ROTATE_ROWS_REQUEST,
  MORFIX_EVALUATE_ROTATE_ROWS_SUCCESS,
  MORFIX_EVALUATE_ROTATE_ROWS_FAILURE,
  MORFIX_EVALUATE_ROTATE_COLUMNS_REQUEST,
  MORFIX_EVALUATE_ROTATE_COLUMNS_SUCCESS,
  MORFIX_EVALUATE_ROTATE_COLUMNS_FAILURE,
  MORFIX_EVALUATE_ROTATE_VECTOR_REQUEST,
  MORFIX_EVALUATE_ROTATE_VECTOR_SUCCESS,
  MORFIX_EVALUATE_ROTATE_VECTOR_FAILURE,
  MORFIX_EVALUATE_COMPLEX_CONJUGATE_REQUEST,
  MORFIX_EVALUATE_COMPLEX_CONJUGATE_SUCCESS,
  MORFIX_EVALUATE_COMPLEX_CONJUGATE_FAILURE,
  MORFIX_EVALUATE_SUM_ELEMENTS_REQUEST,
  MORFIX_EVALUATE_SUM_ELEMENTS_SUCCESS,
  MORFIX_EVALUATE_SUM_ELEMENTS_FAILURE,
  MORFIX_EVALUATE_DOT_PRODUCT_REQUEST,
  MORFIX_EVALUATE_DOT_PRODUCT_SUCCESS,
  MORFIX_EVALUATE_DOT_PRODUCT_FAILURE,
  MORFIX_EVALUATE_DOT_PRODUCT_PLAIN_REQUEST,
  MORFIX_EVALUATE_DOT_PRODUCT_PLAIN_SUCCESS,
  MORFIX_EVALUATE_DOT_PRODUCT_PLAIN_FAILURE
} from 'store/constants/morfix'

export const morfixCreateEncParmsRequest = createActionCreator(MORFIX_CREATE_ENC_PARMS_REQUEST)
export const morfixCreateEncParmsSuccess = createActionCreator(MORFIX_CREATE_ENC_PARMS_SUCCESS)
export const morfixCreateEncParmsFailure = createActionCreator(MORFIX_CREATE_ENC_PARMS_FAILURE, {
  error: true
})

export const morfixCreateContextRequest = createActionCreator(MORFIX_CREATE_CONTEXT_REQUEST)
export const morfixCreateContextSuccess = createActionCreator(MORFIX_CREATE_CONTEXT_SUCCESS)
export const morfixCreateContextFailure = createActionCreator(MORFIX_CREATE_CONTEXT_FAILURE, {
  error: true
})

export const morfixCreateKeyGeneratorRequest = createActionCreator(MORFIX_CREATE_KEY_GENERATOR_REQUEST)
export const morfixCreateKeyGeneratorSuccess = createActionCreator(MORFIX_CREATE_KEY_GENERATOR_SUCCESS)
export const morfixCreateKeyGeneratorFailure = createActionCreator(MORFIX_CREATE_KEY_GENERATOR_FAILURE, {
  error: true
})

export const morfixDeletePublicKeyRequest = createActionCreator(MORFIX_DELETE_PUBLIC_KEY_REQUEST)
export const morfixDeletePublicKeySuccess = createActionCreator(MORFIX_DELETE_PUBLIC_KEY_SUCCESS)
export const morfixDeletePublicKeyFailure = createActionCreator(MORFIX_DELETE_PUBLIC_KEY_FAILURE, {
  error: true
})

export const morfixDeleteSecretKeyRequest = createActionCreator(MORFIX_DELETE_SECRET_KEY_REQUEST)
export const morfixDeleteSecretKeySuccess = createActionCreator(MORFIX_DELETE_SECRET_KEY_SUCCESS)
export const morfixDeleteSecretKeyFailure = createActionCreator(MORFIX_DELETE_SECRET_KEY_FAILURE, {
  error: true
})

export const morfixDeleteRelinKeyRequest = createActionCreator(MORFIX_DELETE_RELIN_KEY_REQUEST)
export const morfixDeleteRelinKeySuccess = createActionCreator(MORFIX_DELETE_RELIN_KEY_SUCCESS)
export const morfixDeleteRelinKeyFailure = createActionCreator(MORFIX_DELETE_RELIN_KEY_FAILURE, {
  error: true
})

export const morfixDeleteGaloisKeyRequest = createActionCreator(MORFIX_DELETE_GALOIS_KEY_REQUEST)
export const morfixDeleteGaloisKeySuccess = createActionCreator(MORFIX_DELETE_GALOIS_KEY_SUCCESS)
export const morfixDeleteGaloisKeyFailure = createActionCreator(MORFIX_DELETE_GALOIS_KEY_FAILURE, {
  error: true
})

export const morfixSetActivePublicKeyRequest = createActionCreator(MORFIX_SET_ACTIVE_PUBLIC_KEY_REQUEST)
export const morfixSetActivePublicKeySuccess = createActionCreator(MORFIX_SET_ACTIVE_PUBLIC_KEY_SUCCESS)
export const morfixSetActivePublicKeyFailure = createActionCreator(MORFIX_SET_ACTIVE_PUBLIC_KEY_FAILURE, {
  error: true
})

export const morfixSetActiveSecretKeyRequest = createActionCreator(MORFIX_SET_ACTIVE_SECRET_KEY_REQUEST)
export const morfixSetActiveSecretKeySuccess = createActionCreator(MORFIX_SET_ACTIVE_SECRET_KEY_SUCCESS)
export const morfixSetActiveSecretKeyFailure = createActionCreator(MORFIX_SET_ACTIVE_SECRET_KEY_FAILURE, {
  error: true
})

export const morfixSetActiveRelinKeyRequest = createActionCreator(MORFIX_SET_ACTIVE_RELIN_KEY_REQUEST)
export const morfixSetActiveRelinKeySuccess = createActionCreator(MORFIX_SET_ACTIVE_RELIN_KEY_SUCCESS)
export const morfixSetActiveRelinKeyFailure = createActionCreator(MORFIX_SET_ACTIVE_RELIN_KEY_FAILURE, {
  error: true
})

export const morfixSetActiveGaloisKeyRequest = createActionCreator(MORFIX_SET_ACTIVE_GALOIS_KEY_REQUEST)
export const morfixSetActiveGaloisKeySuccess = createActionCreator(MORFIX_SET_ACTIVE_GALOIS_KEY_SUCCESS)
export const morfixSetActiveGaloisKeyFailure = createActionCreator(MORFIX_SET_ACTIVE_GALOIS_KEY_FAILURE, {
  error: true
})

export const morfixGeneratePublicKeyRequest = createActionCreator(MORFIX_GENERATE_PUBLIC_KEY_REQUEST)
export const morfixGeneratePublicKeySuccess = createActionCreator(MORFIX_GENERATE_PUBLIC_KEY_SUCCESS)
export const morfixGeneratePublicKeyFailure = createActionCreator(MORFIX_GENERATE_PUBLIC_KEY_FAILURE, {
  error: true
})

export const morfixGenerateSecretKeyRequest = createActionCreator(MORFIX_GENERATE_SECRET_KEY_REQUEST)
export const morfixGenerateSecretKeySuccess = createActionCreator(MORFIX_GENERATE_SECRET_KEY_SUCCESS)
export const morfixGenerateSecretKeyFailure = createActionCreator(MORFIX_GENERATE_SECRET_KEY_FAILURE, {
  error: true
})

export const morfixGenerateRelinKeyRequest = createActionCreator(MORFIX_GENERATE_RELIN_KEY_REQUEST)
export const morfixGenerateRelinKeySuccess = createActionCreator(MORFIX_GENERATE_RELIN_KEY_SUCCESS)
export const morfixGenerateRelinKeyFailure = createActionCreator(MORFIX_GENERATE_RELIN_KEY_FAILURE, {
  error: true
})

export const morfixGenerateGaloisKeyRequest = createActionCreator(MORFIX_GENERATE_GALOIS_KEY_REQUEST)
export const morfixGenerateGaloisKeySuccess = createActionCreator(MORFIX_GENERATE_GALOIS_KEY_SUCCESS)
export const morfixGenerateGaloisKeyFailure = createActionCreator(MORFIX_GENERATE_GALOIS_KEY_FAILURE, {
  error: true
})

export const morfixTriggerDownloadRequest = createActionCreator(MORFIX_TRIGGER_DOWNLOAD_REQUEST)
export const morfixTriggerDownloadSuccess = createActionCreator(MORFIX_TRIGGER_DOWNLOAD_SUCCESS)
export const morfixTriggerDownloadFailure = createActionCreator(MORFIX_TRIGGER_DOWNLOAD_FAILURE, {
  error: true
})

export const morfixDownloadPublicKeyRequest = createActionCreator(MORFIX_DOWNLOAD_PUBLIC_KEY_REQUEST)
export const morfixDownloadPublicKeySuccess = createActionCreator(MORFIX_DOWNLOAD_PUBLIC_KEY_SUCCESS)
export const morfixDownloadPublicKeyFailure = createActionCreator(MORFIX_DOWNLOAD_PUBLIC_KEY_FAILURE, {
  error: true
})

export const morfixDownloadSecretKeyRequest = createActionCreator(MORFIX_DOWNLOAD_SECRET_KEY_REQUEST)
export const morfixDownloadSecretKeySuccess = createActionCreator(MORFIX_DOWNLOAD_SECRET_KEY_SUCCESS)
export const morfixDownloadSecretKeyFailure = createActionCreator(MORFIX_DOWNLOAD_SECRET_KEY_FAILURE, {
  error: true
})

export const morfixDownloadRelinKeyRequest = createActionCreator(MORFIX_DOWNLOAD_RELIN_KEY_REQUEST)
export const morfixDownloadRelinKeySuccess = createActionCreator(MORFIX_DOWNLOAD_RELIN_KEY_SUCCESS)
export const morfixDownloadRelinKeyFailure = createActionCreator(MORFIX_DOWNLOAD_RELIN_KEY_FAILURE, {
  error: true
})

export const morfixDownloadGaloisKeyRequest = createActionCreator(MORFIX_DOWNLOAD_GALOIS_KEY_REQUEST)
export const morfixDownloadGaloisKeySuccess = createActionCreator(MORFIX_DOWNLOAD_GALOIS_KEY_SUCCESS)
export const morfixDownloadGaloisKeyFailure = createActionCreator(MORFIX_DOWNLOAD_GALOIS_KEY_FAILURE, {
  error: true
})

export const morfixUploadPublicKeyRequest = createActionCreator(MORFIX_UPLOAD_PUBLIC_KEY_REQUEST)
export const morfixUploadPublicKeySuccess = createActionCreator(MORFIX_UPLOAD_PUBLIC_KEY_SUCCESS)
export const morfixUploadPublicKeyFailure = createActionCreator(MORFIX_UPLOAD_PUBLIC_KEY_FAILURE, {
  error: true
})

export const morfixUploadSecretKeyRequest = createActionCreator(MORFIX_UPLOAD_SECRET_KEY_REQUEST)
export const morfixUploadSecretKeySuccess = createActionCreator(MORFIX_UPLOAD_SECRET_KEY_SUCCESS)
export const morfixUploadSecretKeyFailure = createActionCreator(MORFIX_UPLOAD_SECRET_KEY_FAILURE, {
  error: true
})

export const morfixUploadRelinKeyRequest = createActionCreator(MORFIX_UPLOAD_RELIN_KEY_REQUEST)
export const morfixUploadRelinKeySuccess = createActionCreator(MORFIX_UPLOAD_RELIN_KEY_SUCCESS)
export const morfixUploadRelinKeyFailure = createActionCreator(MORFIX_UPLOAD_RELIN_KEY_FAILURE, {
  error: true
})

export const morfixUploadGaloisKeyRequest = createActionCreator(MORFIX_UPLOAD_GALOIS_KEY_REQUEST)
export const morfixUploadGaloisKeySuccess = createActionCreator(MORFIX_UPLOAD_GALOIS_KEY_SUCCESS)
export const morfixUploadGaloisKeyFailure = createActionCreator(MORFIX_UPLOAD_GALOIS_KEY_FAILURE, {
  error: true
})

export const morfixCreateIntegerEncoderRequest = createActionCreator(MORFIX_CREATE_INTEGER_ENCODER_REQUEST)
export const morfixCreateIntegerEncoderSuccess = createActionCreator(MORFIX_CREATE_INTEGER_ENCODER_SUCCESS)
export const morfixCreateIntegerEncoderFailure = createActionCreator(MORFIX_CREATE_INTEGER_ENCODER_FAILURE, {
  error: true
})

export const morfixCreateBatchEncoderRequest = createActionCreator(MORFIX_CREATE_BATCH_ENCODER_REQUEST)
export const morfixCreateBatchEncoderSuccess = createActionCreator(MORFIX_CREATE_BATCH_ENCODER_SUCCESS)
export const morfixCreateBatchEncoderFailure = createActionCreator(MORFIX_CREATE_BATCH_ENCODER_FAILURE, {
  error: true
})

export const morfixCreateCkksEncoderRequest = createActionCreator(MORFIX_CREATE_CKKS_ENCODER_REQUEST)
export const morfixCreateCkksEncoderSuccess = createActionCreator(MORFIX_CREATE_CKKS_ENCODER_SUCCESS)
export const morfixCreateCkksEncoderFailure = createActionCreator(MORFIX_CREATE_CKKS_ENCODER_FAILURE, {
  error: true
})

export const morfixCreateEncryptorRequest = createActionCreator(MORFIX_CREATE_ENCRYPTOR_REQUEST)
export const morfixCreateEncryptorSuccess = createActionCreator(MORFIX_CREATE_ENCRYPTOR_SUCCESS)
export const morfixCreateEncryptorFailure = createActionCreator(MORFIX_CREATE_ENCRYPTOR_FAILURE, {
  error: true
})

export const morfixCreateDecryptorRequest = createActionCreator(MORFIX_CREATE_DECRYPTOR_REQUEST)
export const morfixCreateDecryptorSuccess = createActionCreator(MORFIX_CREATE_DECRYPTOR_SUCCESS)
export const morfixCreateDecryptorFailure = createActionCreator(MORFIX_CREATE_DECRYPTOR_FAILURE, {
  error: true
})

export const morfixDeleteEncryptorRequest = createActionCreator(MORFIX_DELETE_ENCRYPTOR_REQUEST)
export const morfixDeleteEncryptorSuccess = createActionCreator(MORFIX_DELETE_ENCRYPTOR_SUCCESS)
export const morfixDeleteEncryptorFailure = createActionCreator(MORFIX_DELETE_ENCRYPTOR_FAILURE, {
  error: true
})

export const morfixDeleteDecryptorRequest = createActionCreator(MORFIX_DELETE_DECRYPTOR_REQUEST)
export const morfixDeleteDecryptorSuccess = createActionCreator(MORFIX_DELETE_DECRYPTOR_SUCCESS)
export const morfixDeleteDecryptorFailure = createActionCreator(MORFIX_DELETE_DECRYPTOR_FAILURE, {
  error: true
})

export const morfixCreateEvaluatorRequest = createActionCreator(MORFIX_CREATE_EVALUATOR_REQUEST)
export const morfixCreateEvaluatorSuccess = createActionCreator(MORFIX_CREATE_EVALUATOR_SUCCESS)
export const morfixCreateEvaluatorFailure = createActionCreator(MORFIX_CREATE_EVALUATOR_FAILURE, {
  error: true
})

export const morfixBatchEncodeInt32Request = createActionCreator(MORFIX_BATCH_ENCODE_INT32_REQUEST)
export const morfixBatchEncodeInt32Success = createActionCreator(MORFIX_BATCH_ENCODE_INT32_SUCCESS)
export const morfixBatchEncodeInt32Failure = createActionCreator(MORFIX_BATCH_ENCODE_INT32_FAILURE, {
  error: true
})

export const morfixBatchEncodeUint32Request = createActionCreator(MORFIX_BATCH_ENCODE_UINT32_REQUEST)
export const morfixBatchEncodeUint32Success = createActionCreator(MORFIX_BATCH_ENCODE_UINT32_SUCCESS)
export const morfixBatchEncodeUint32Failure = createActionCreator(MORFIX_BATCH_ENCODE_UINT32_FAILURE, {
  error: true
})

export const morfixCkksEncodeFloat64Request = createActionCreator(MORFIX_CKKS_ENCODE_FLOAT64_REQUEST)
export const morfixCkksEncodeFloat64Success = createActionCreator(MORFIX_CKKS_ENCODE_FLOAT64_SUCCESS)
export const morfixCkksEncodeFloat64Failure = createActionCreator(MORFIX_CKKS_ENCODE_FLOAT64_FAILURE, {
  error: true
})

export const morfixBatchDecodeInt32Request = createActionCreator(MORFIX_BATCH_DECODE_INT32_REQUEST)
export const morfixBatchDecodeInt32Success = createActionCreator(MORFIX_BATCH_DECODE_INT32_SUCCESS)
export const morfixBatchDecodeInt32Failure = createActionCreator(MORFIX_BATCH_DECODE_INT32_FAILURE, {
  error: true
})

export const morfixBatchDecodeUint32Request = createActionCreator(MORFIX_BATCH_DECODE_UINT32_REQUEST)
export const morfixBatchDecodeUint32Success = createActionCreator(MORFIX_BATCH_DECODE_UINT32_SUCCESS)
export const morfixBatchDecodeUint32Failure = createActionCreator(MORFIX_BATCH_DECODE_UINT32_FAILURE, {
  error: true
})

export const morfixCkksDecodeFloat64Request = createActionCreator(MORFIX_CKKS_DECODE_FLOAT64_REQUEST)
export const morfixCkksDecodeFloat64Success = createActionCreator(MORFIX_CKKS_DECODE_FLOAT64_SUCCESS)
export const morfixCkksDecodeFloat64Failure = createActionCreator(MORFIX_CKKS_DECODE_FLOAT64_FAILURE, {
  error: true
})

export const morfixEncryptRequest = createActionCreator(MORFIX_ENCRYPT_REQUEST)
export const morfixEncryptSuccess = createActionCreator(MORFIX_ENCRYPT_SUCCESS)
export const morfixEncryptFailure = createActionCreator(MORFIX_ENCRYPT_FAILURE, {
  error: true
})

export const morfixDecryptRequest = createActionCreator(MORFIX_DECRYPT_REQUEST)
export const morfixDecryptSuccess = createActionCreator(MORFIX_DECRYPT_SUCCESS)
export const morfixDecryptFailure = createActionCreator(MORFIX_DECRYPT_FAILURE, {
  error: true
})

export const morfixCreatePlainTextRequest = createActionCreator(MORFIX_CREATE_PLAIN_TEXT_REQUEST)
export const morfixCreatePlainTextSuccess = createActionCreator(MORFIX_CREATE_PLAIN_TEXT_SUCCESS)
export const morfixCreatePlainTextFailure = createActionCreator(MORFIX_CREATE_PLAIN_TEXT_FAILURE, {
  error: true
})

export const morfixReadPlainTextRequest = createActionCreator(MORFIX_READ_PLAIN_TEXT_REQUEST)
export const morfixReadPlainTextSuccess = createActionCreator(MORFIX_READ_PLAIN_TEXT_SUCCESS)
export const morfixReadPlainTextFailure = createActionCreator(MORFIX_READ_PLAIN_TEXT_FAILURE, {
  error: true
})

export const morfixUpdatePlainTextRequest = createActionCreator(MORFIX_UPDATE_PLAIN_TEXT_REQUEST)
export const morfixUpdatePlainTextSuccess = createActionCreator(MORFIX_UPDATE_PLAIN_TEXT_SUCCESS)
export const morfixUpdatePlainTextFailure = createActionCreator(MORFIX_UPDATE_PLAIN_TEXT_FAILURE, {
  error: true
})

export const morfixDeletePlainTextRequest = createActionCreator(MORFIX_DELETE_PLAIN_TEXT_REQUEST)
export const morfixDeletePlainTextSuccess = createActionCreator(MORFIX_DELETE_PLAIN_TEXT_SUCCESS)
export const morfixDeletePlainTextFailure = createActionCreator(MORFIX_DELETE_PLAIN_TEXT_FAILURE, {
  error: true
})

export const morfixDownloadPlainTextRequest = createActionCreator(MORFIX_DOWNLOAD_PLAIN_TEXT_REQUEST)
export const morfixDownloadPlainTextSuccess = createActionCreator(MORFIX_DOWNLOAD_PLAIN_TEXT_SUCCESS)
export const morfixDownloadPlainTextFailure = createActionCreator(MORFIX_DOWNLOAD_PLAIN_TEXT_FAILURE, {
  error: true
})

export const morfixUploadPlainTextRequest = createActionCreator(MORFIX_UPLOAD_PLAIN_TEXT_REQUEST)
export const morfixUploadPlainTextSuccess = createActionCreator(MORFIX_UPLOAD_PLAIN_TEXT_SUCCESS)
export const morfixUploadPlainTextFailure = createActionCreator(MORFIX_UPLOAD_PLAIN_TEXT_FAILURE, {
  error: true
})

export const morfixLoadPlainTextRequest = createActionCreator(MORFIX_LOAD_PLAIN_TEXT_REQUEST)
export const morfixLoadPlainTextSuccess = createActionCreator(MORFIX_LOAD_PLAIN_TEXT_SUCCESS)
export const morfixLoadPlainTextFailure = createActionCreator(MORFIX_LOAD_PLAIN_TEXT_FAILURE, {
  error: true
})

export const morfixCreateCipherTextRequest = createActionCreator(MORFIX_CREATE_CIPHER_TEXT_REQUEST)
export const morfixCreateCipherTextSuccess = createActionCreator(MORFIX_CREATE_CIPHER_TEXT_SUCCESS)
export const morfixCreateCipherTextFailure = createActionCreator(MORFIX_CREATE_CIPHER_TEXT_FAILURE, {
  error: true
})

export const morfixReadCipherTextRequest = createActionCreator(MORFIX_READ_CIPHER_TEXT_REQUEST)
export const morfixReadCipherTextSuccess = createActionCreator(MORFIX_READ_CIPHER_TEXT_SUCCESS)
export const morfixReadCipherTextFailure = createActionCreator(MORFIX_READ_CIPHER_TEXT_FAILURE, {
  error: true
})

export const morfixUpdateCipherTextRequest = createActionCreator(MORFIX_UPDATE_CIPHER_TEXT_REQUEST)
export const morfixUpdateCipherTextSuccess = createActionCreator(MORFIX_UPDATE_CIPHER_TEXT_SUCCESS)
export const morfixUpdateCipherTextFailure = createActionCreator(MORFIX_UPDATE_CIPHER_TEXT_FAILURE, {
  error: true
})

export const morfixDeleteCipherTextRequest = createActionCreator(MORFIX_DELETE_CIPHER_TEXT_REQUEST)
export const morfixDeleteCipherTextSuccess = createActionCreator(MORFIX_DELETE_CIPHER_TEXT_SUCCESS)
export const morfixDeleteCipherTextFailure = createActionCreator(MORFIX_DELETE_CIPHER_TEXT_FAILURE, {
  error: true
})

export const morfixDownloadCipherTextRequest = createActionCreator(MORFIX_DOWNLOAD_CIPHER_TEXT_REQUEST)
export const morfixDownloadCipherTextSuccess = createActionCreator(MORFIX_DOWNLOAD_CIPHER_TEXT_SUCCESS)
export const morfixDownloadCipherTextFailure = createActionCreator(MORFIX_DOWNLOAD_CIPHER_TEXT_FAILURE, {
  error: true
})

export const morfixUploadCipherTextRequest = createActionCreator(MORFIX_UPLOAD_CIPHER_TEXT_REQUEST)
export const morfixUploadCipherTextSuccess = createActionCreator(MORFIX_UPLOAD_CIPHER_TEXT_SUCCESS)
export const morfixUploadCipherTextFailure = createActionCreator(MORFIX_UPLOAD_CIPHER_TEXT_FAILURE, {
  error: true
})

export const morfixLoadCipherTextRequest = createActionCreator(MORFIX_LOAD_CIPHER_TEXT_REQUEST)
export const morfixLoadCipherTextSuccess = createActionCreator(MORFIX_LOAD_CIPHER_TEXT_SUCCESS)
export const morfixLoadCipherTextFailure = createActionCreator(MORFIX_LOAD_CIPHER_TEXT_FAILURE, {
  error: true
})

export const morfixEngineCreateActionRequest = createActionCreator(MORFIX_ENGINE_CREATE_ACTION_REQUEST)
export const morfixEngineCreateActionSuccess = createActionCreator(MORFIX_ENGINE_CREATE_ACTION_SUCCESS)
export const morfixEngineCreateActionFailure = createActionCreator(MORFIX_ENGINE_CREATE_ACTION_FAILURE, {
  error: true
})

export const morfixEngineUpdateActionRequest = createActionCreator(MORFIX_ENGINE_UPDATE_ACTION_REQUEST)
export const morfixEngineUpdateActionSuccess = createActionCreator(MORFIX_ENGINE_UPDATE_ACTION_SUCCESS)
export const morfixEngineUpdateActionFailure = createActionCreator(MORFIX_ENGINE_UPDATE_ACTION_FAILURE, {
  error: true
})

export const morfixEngineDeleteActionRequest = createActionCreator(MORFIX_ENGINE_DELETE_ACTION_REQUEST)
export const morfixEngineDeleteActionSuccess = createActionCreator(MORFIX_ENGINE_DELETE_ACTION_SUCCESS)
export const morfixEngineDeleteActionFailure = createActionCreator(MORFIX_ENGINE_DELETE_ACTION_FAILURE, {
  error: true
})

export const morfixEngineExecuteAllActionsRequest = createActionCreator(MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_REQUEST)
export const morfixEngineExecuteAllActionsSuccess = createActionCreator(MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_SUCCESS)
export const morfixEngineExecuteAllActionsFailure = createActionCreator(MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_FAILURE, {
  error: true
})

export const morfixEvaluateNegateCipherRequest = createActionCreator(MORFIX_EVALUATE_NEGATE_CIPHER_REQUEST)
export const morfixEvaluateNegateCipherSuccess = createActionCreator(MORFIX_EVALUATE_NEGATE_CIPHER_SUCCESS)
export const morfixEvaluateNegateCipherFailure = createActionCreator(MORFIX_EVALUATE_NEGATE_CIPHER_FAILURE, {
  error: true
})

export const morfixEvaluateAddCipherToCipherRequest = createActionCreator(MORFIX_EVALUATE_ADD_CIPHER_TO_CIPHER_REQUEST)
export const morfixEvaluateAddCipherToCipherSuccess = createActionCreator(MORFIX_EVALUATE_ADD_CIPHER_TO_CIPHER_SUCCESS)
export const morfixEvaluateAddCipherToCipherFailure = createActionCreator(
  MORFIX_EVALUATE_ADD_CIPHER_TO_CIPHER_FAILURE,
  {
    error: true
  }
)

export const morfixEvaluateAddPlainToCipherRequest = createActionCreator(MORFIX_EVALUATE_ADD_PLAIN_TO_CIPHER_REQUEST)
export const morfixEvaluateAddPlainToCipherSuccess = createActionCreator(MORFIX_EVALUATE_ADD_PLAIN_TO_CIPHER_SUCCESS)
export const morfixEvaluateAddPlainToCipherFailure = createActionCreator(MORFIX_EVALUATE_ADD_PLAIN_TO_CIPHER_FAILURE, {
  error: true
})

export const morfixEvaluateSubCipherFromCipherRequest = createActionCreator(
  MORFIX_EVALUATE_SUB_CIPHER_FROM_CIPHER_REQUEST
)
export const morfixEvaluateSubCipherFromCipherSuccess = createActionCreator(
  MORFIX_EVALUATE_SUB_CIPHER_FROM_CIPHER_SUCCESS
)
export const morfixEvaluateSubCipherFromCipherFailure = createActionCreator(
  MORFIX_EVALUATE_SUB_CIPHER_FROM_CIPHER_FAILURE,
  {
    error: true
  }
)

export const morfixEvaluateSubPlainFromCipherRequest = createActionCreator(
  MORFIX_EVALUATE_SUB_PLAIN_FROM_CIPHER_REQUEST
)
export const morfixEvaluateSubPlainFromCipherSuccess = createActionCreator(
  MORFIX_EVALUATE_SUB_PLAIN_FROM_CIPHER_SUCCESS
)
export const morfixEvaluateSubPlainFromCipherFailure = createActionCreator(
  MORFIX_EVALUATE_SUB_PLAIN_FROM_CIPHER_FAILURE,
  {
    error: true
  }
)

export const morfixEvaluateMultiplyCipherByCipherRequest = createActionCreator(
  MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_CIPHER_REQUEST
)
export const morfixEvaluateMultiplyCipherByCipherSuccess = createActionCreator(
  MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_CIPHER_SUCCESS
)
export const morfixEvaluateMultiplyCipherByCipherFailure = createActionCreator(
  MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_CIPHER_FAILURE,
  {
    error: true
  }
)

export const morfixEvaluateMultiplyCipherByPlainRequest = createActionCreator(
  MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_PLAIN_REQUEST
)
export const morfixEvaluateMultiplyCipherByPlainSuccess = createActionCreator(
  MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_PLAIN_SUCCESS
)
export const morfixEvaluateMultiplyCipherByPlainFailure = createActionCreator(
  MORFIX_EVALUATE_MULTIPLY_CIPHER_BY_PLAIN_FAILURE,
  {
    error: true
  }
)

export const morfixEvaluateSquareCipherRequest = createActionCreator(MORFIX_EVALUATE_SQUARE_CIPHER_REQUEST)
export const morfixEvaluateSquareCipherSuccess = createActionCreator(MORFIX_EVALUATE_SQUARE_CIPHER_SUCCESS)
export const morfixEvaluateSquareCipherFailure = createActionCreator(MORFIX_EVALUATE_SQUARE_CIPHER_FAILURE, {
  error: true
})

export const morfixEvaluateRelinearizeCipherRequest = createActionCreator(MORFIX_EVALUATE_RELINEARIZE_CIPHER_REQUEST)
export const morfixEvaluateRelinearizeCipherSuccess = createActionCreator(MORFIX_EVALUATE_RELINEARIZE_CIPHER_SUCCESS)
export const morfixEvaluateRelinearizeCipherFailure = createActionCreator(MORFIX_EVALUATE_RELINEARIZE_CIPHER_FAILURE, {
  error: true
})

export const morfixEvaluateExponentiateCipherRequest = createActionCreator(MORFIX_EVALUATE_EXPONENTIATE_CIPHER_REQUEST)
export const morfixEvaluateExponentiateCipherSuccess = createActionCreator(MORFIX_EVALUATE_EXPONENTIATE_CIPHER_SUCCESS)
export const morfixEvaluateExponentiateCipherFailure = createActionCreator(
  MORFIX_EVALUATE_EXPONENTIATE_CIPHER_FAILURE,
  {
    error: true
  }
)

export const morfixEvaluateCipherModulusSwitchToNextRequest = createActionCreator(
  MORFIX_EVALUATE_CIPHER_MODULUS_SWITCH_TO_NEXT_REQUEST
)
export const morfixEvaluateCipherModulusSwitchToNextSuccess = createActionCreator(
  MORFIX_EVALUATE_CIPHER_MODULUS_SWITCH_TO_NEXT_SUCCESS
)
export const morfixEvaluateCipherModulusSwitchToNextFailure = createActionCreator(
  MORFIX_EVALUATE_CIPHER_MODULUS_SWITCH_TO_NEXT_FAILURE,
  {
    error: true
  }
)

export const morfixEvaluatePlainModulusSwitchToNextRequest = createActionCreator(
  MORFIX_EVALUATE_PLAIN_MODULUS_SWITCH_TO_NEXT_REQUEST
)
export const morfixEvaluatePlainModulusSwitchToNextSuccess = createActionCreator(
  MORFIX_EVALUATE_PLAIN_MODULUS_SWITCH_TO_NEXT_SUCCESS
)
export const morfixEvaluatePlainModulusSwitchToNextFailure = createActionCreator(
  MORFIX_EVALUATE_PLAIN_MODULUS_SWITCH_TO_NEXT_FAILURE,
  {
    error: true
  }
)

export const morfixEvaluateCipherRescaleToNextRequest = createActionCreator(
  MORFIX_EVALUATE_CIPHER_RESCALE_TO_NEXT_REQUEST
)
export const morfixEvaluateCipherRescaleToNextSuccess = createActionCreator(
  MORFIX_EVALUATE_CIPHER_RESCALE_TO_NEXT_SUCCESS
)
export const morfixEvaluateCipherRescaleToNextFailure = createActionCreator(
  MORFIX_EVALUATE_CIPHER_RESCALE_TO_NEXT_FAILURE,
  {
    error: true
  }
)

export const morfixEvaluatePlainTransformToNTTRequest = createActionCreator(
  MORFIX_EVALUATE_PLAIN_TRANSFORM_TO_NTT_REQUEST
)
export const morfixEvaluatePlainTransformToNTTSuccess = createActionCreator(
  MORFIX_EVALUATE_PLAIN_TRANSFORM_TO_NTT_SUCCESS
)
export const morfixEvaluatePlainTransformToNTTFailure = createActionCreator(
  MORFIX_EVALUATE_PLAIN_TRANSFORM_TO_NTT_FAILURE,
  {
    error: true
  }
)

export const morfixEvaluateCipherTransformToNTTRequest = createActionCreator(
  MORFIX_EVALUATE_CIPHER_TRANSFORM_TO_NTT_REQUEST
)
export const morfixEvaluateCipherTransformToNTTSuccess = createActionCreator(
  MORFIX_EVALUATE_CIPHER_TRANSFORM_TO_NTT_SUCCESS
)
export const morfixEvaluateCipherTransformToNTTFailure = createActionCreator(
  MORFIX_EVALUATE_CIPHER_TRANSFORM_TO_NTT_FAILURE,
  {
    error: true
  }
)

export const morfixEvaluateCipherTransformFromNTTRequest = createActionCreator(
  MORFIX_EVALUATE_CIPHER_TRANSFORM_FROM_NTT_REQUEST
)
export const morfixEvaluateCipherTransformFromNTTSuccess = createActionCreator(
  MORFIX_EVALUATE_CIPHER_TRANSFORM_FROM_NTT_SUCCESS
)
export const morfixEvaluateCipherTransformFromNTTFailure = createActionCreator(
  MORFIX_EVALUATE_CIPHER_TRANSFORM_FROM_NTT_FAILURE,
  {
    error: true
  }
)

export const morfixEvaluateRotateRowsRequest = createActionCreator(MORFIX_EVALUATE_ROTATE_ROWS_REQUEST)
export const morfixEvaluateRotateRowsSuccess = createActionCreator(MORFIX_EVALUATE_ROTATE_ROWS_SUCCESS)
export const morfixEvaluateRotateRowsFailure = createActionCreator(MORFIX_EVALUATE_ROTATE_ROWS_FAILURE, {
  error: true
})

export const morfixEvaluateRotateColumnsRequest = createActionCreator(MORFIX_EVALUATE_ROTATE_COLUMNS_REQUEST)
export const morfixEvaluateRotateColumnsSuccess = createActionCreator(MORFIX_EVALUATE_ROTATE_COLUMNS_SUCCESS)
export const morfixEvaluateRotateColumnsFailure = createActionCreator(MORFIX_EVALUATE_ROTATE_COLUMNS_FAILURE, {
  error: true
})

export const morfixEvaluateRotateVectorRequest = createActionCreator(MORFIX_EVALUATE_ROTATE_VECTOR_REQUEST)
export const morfixEvaluateRotateVectorSuccess = createActionCreator(MORFIX_EVALUATE_ROTATE_VECTOR_SUCCESS)
export const morfixEvaluateRotateVectorFailure = createActionCreator(MORFIX_EVALUATE_ROTATE_VECTOR_FAILURE, {
  error: true
})

export const morfixEvaluateComplexConjugateRequest = createActionCreator(MORFIX_EVALUATE_COMPLEX_CONJUGATE_REQUEST)
export const morfixEvaluateComplexConjugateSuccess = createActionCreator(MORFIX_EVALUATE_COMPLEX_CONJUGATE_SUCCESS)
export const morfixEvaluateComplexConjugateFailure = createActionCreator(MORFIX_EVALUATE_COMPLEX_CONJUGATE_FAILURE, {
  error: true
})

export const morfixEvaluateSumElementsRequest = createActionCreator(MORFIX_EVALUATE_SUM_ELEMENTS_REQUEST)
export const morfixEvaluateSumElementsSuccess = createActionCreator(MORFIX_EVALUATE_SUM_ELEMENTS_SUCCESS)
export const morfixEvaluateSumElementsFailure = createActionCreator(MORFIX_EVALUATE_SUM_ELEMENTS_FAILURE, {
  error: true
})
export const morfixEvaluateDotProductRequest = createActionCreator(MORFIX_EVALUATE_DOT_PRODUCT_REQUEST)
export const morfixEvaluateDotProductSuccess = createActionCreator(MORFIX_EVALUATE_DOT_PRODUCT_SUCCESS)
export const morfixEvaluateDotProductFailure = createActionCreator(MORFIX_EVALUATE_DOT_PRODUCT_FAILURE, {
  error: true
})
export const morfixEvaluateDotProductPlainRequest = createActionCreator(MORFIX_EVALUATE_DOT_PRODUCT_PLAIN_REQUEST)
export const morfixEvaluateDotProductPlainSuccess = createActionCreator(MORFIX_EVALUATE_DOT_PRODUCT_PLAIN_SUCCESS)
export const morfixEvaluateDotProductPlainFailure = createActionCreator(MORFIX_EVALUATE_DOT_PRODUCT_PLAIN_FAILURE, {
  error: true
})
