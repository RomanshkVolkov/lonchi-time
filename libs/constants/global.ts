export const ACTION_SUCCESS_RESPONSE = {
   success: true,
   message: '',
   details: '',
   errors: {} as Record<string, string[]>,
};

export const ACTION_ERROR_RESPONSE = {
   success: false,
   message: '',
   details: '',
   errors: {} as Record<string, string[]>,
};
