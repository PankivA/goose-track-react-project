import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, notify } from 'utilities';

export const sendFeedbackToBackend = createAsyncThunk(
  'reviews/own',
  async (credentials, thunkApi) => {
    try {
      const response = await api.instance.post('/reviews/own', credentials);
      console.log(response.data);
      notify('success', 'Your review successfully wrote.Thank you!');
      return response.data.data;
    } catch (error) {
      console.log(error);
      notify('error', error.response.data.data || 'Oops! Something goes wrong');
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getReviewFromBackend = createAsyncThunk(
  'reviews/own',
  async (credentials, thunkApi) => {
    try {
      const response = await api.instance.get('/reviews/own', credentials);
      const result = response.data.review[0];
      console.log('getReviewFromBackend.response', credentials);
      return result;
    } catch (error) {
      console.log(error);
      notify(
        'error',
        error.response.data.data[0] || 'Oops! Something goes wrong'
      );
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/own',
  async (credentials, thunkApi) => {
    try {
      const response = await api.instance.delete('/reviews/own', credentials);
      const result = response.data.review;
      notify('success', 'Your review successfully deleted.');
      console.log('delete', result);
      return result;
    } catch (error) {
      console.log(error);
      notify(
        'error',
        error.response.data.review || 'Oops! Something goes wrong'
      );
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const editReview = createAsyncThunk(
  'reviews/own',
  async (credentials, thunkApi) => {
    try {
      const response = await api.instance.patch('/reviews/own', credentials);
      console.log(response.data);
      notify('success', 'Your review successfully edited.Thank you!');
      return response.data.data;
    } catch (error) {
      console.log(error);
      notify('error', error.response.data.data || 'Oops! Something goes wrong');
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
