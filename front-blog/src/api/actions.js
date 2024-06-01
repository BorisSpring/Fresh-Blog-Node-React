import axios from 'axios';

const baseUrl = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
  // but i will use authorization header this is just for show case that i am aware of this
  withCredentials: true,
});

baseUrl.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    console.log('error for intercepting request', err);
  }
);

// --- MESSAGES ---

export async function findMessagesApi(params) {
  const res = await baseUrl.get('api/v1/messages', { params: params });
  return res.data;
}

export async function deleteMessageApi(msgId) {
  const res = await baseUrl.delete(`api/v1/messages/${msgId}`);
  return res.data;
}

export async function updateMessageApi(msgId, isRead) {
  const res = await baseUrl.patch(`api/v1/messages/${msgId}`, {
    isRead: isRead,
  });
  return res.data;
}

export async function sendMessageApi(msgBody) {
  const res = await baseUrl.post(`api/v1/messages/`, msgBody);
  return res.data;
}

// --- MESSAGES END ---

// --- COMMENTS ---

export async function postCommentApi(commentBody) {
  const res = await baseUrl.post(`api/v1/comments/`, commentBody);
  return res.data;
}

export async function enableDisableCommentApi(id, enabled) {
  const res = await baseUrl.patch(`api/v1/comments/${id}`, {
    enabled: enabled,
  });
  return res.data;
}

export async function deleteCommentApi(id) {
  const res = await baseUrl.delete(`api/v1/comments/${id}`);
  return res.data;
}

export async function getUserCommentsApi(params) {
  const res = await baseUrl.get(`api/v1/comments/meComments`, {
    params: params,
  });
  return res.data;
}

export async function getAllCommentsApi(params) {
  const res = await baseUrl.get(`api/v1/comments`, { params: params });
  return res.data;
}

export async function updateCommentApi(commentId, comment) {
  const res = await baseUrl.patch(`api/v1/comments/${commentId}`, {
    comment: comment,
  });
  return res.data;
}

// --- COMMENTS END ---

// -- AUTH --

export async function loginApi(credentials) {
  const res = await baseUrl.post('/api/v1/users/signIn', credentials);
  return res.data;
}

export async function registerApi(userInfo) {
  const res = await baseUrl.post('/api/v1/users/signUp', userInfo);
  return res.data;
}

export async function requestPasswordResetTokenApi(email) {
  const res = await baseUrl.post('/api/v1/users/resetPassword', email);
  return res.data;
}

export async function resetPasswordWithTokenApi(
  token,
  password,
  passwordConfirm
) {
  const res = await baseUrl.patch(`api/v1/users/resetPassword/${token}`, {
    password,
    passwordConfirm,
  });
  return res.data;
}

// -- AUTH END --

// --- USERS ---

export async function getAllUsersApi(params) {
  const res = await baseUrl.get('/api/v1/users/all', { params: params });
  return res.data;
}

export async function banUnbanUserApi(userId, isBanned) {
  const res = await baseUrl.patch(`api/v1/users/banUser/${userId}`, {
    isBanned: isBanned,
  });
  return res.data;
}

export async function deleteUserApi(userId) {
  const res = await baseUrl.delete(`api/v1/users/${userId}`);
  return res.data;
}

export async function deactivateAccountApi() {
  const res = await baseUrl.patch(`api/v1/users/deactivateMe`);
  return res.data;
}

export async function changePasswordApi(passwords) {
  const res = await baseUrl.patch(`api/v1/users/changePassword`, passwords);
  return res.data;
}

export async function updatePictureApi(picture) {
  const res = await baseUrl.patch(
    `api/v1/users/updatePicture`,
    { photo: picture },
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return res.data;
}

export async function getLoggedUserApi() {
  const res = await baseUrl.get('api/v1/users/me');
  return res.data;
}

export async function verifyAccountUserApi(verifyToken) {
  const res = await baseUrl.patch(`api/v1/users/verify/${verifyToken}`);
  return res.data;
}

// --- USERS END ---

// --- BLOGS ---

export async function getBlogsDashboardAdminApi(params) {
  const res = await baseUrl.get('api/v1/blogs/allBlogs', { params: params });
  return res.data;
}

export async function getBlogsDashboardUserApi(params) {
  const res = await baseUrl.get('api/v1/blogs/me', { params: params });
  return res.data;
}

export async function deleteBlogApi(blogId) {
  const res = await baseUrl.delete(`api/v1/blogs/${blogId}`);
  return res.data;
}

export async function getMostViewedBlogs() {
  const res = await baseUrl.get('api/v1/blogs/mostViewedBlogs');
  return res.data;
}

export async function getLast4BlogsApi() {
  const res = await baseUrl.get('api/v1/blogs/lastFourEnabledBlogs');
  return res.data;
}

export async function updateBlogStatusApi(id, enabled) {
  const res = await baseUrl.patch(`api/v1/blogs/${id}`, { enabled: enabled });
  return res.data;
}

export async function getMainPageBlogsApi(params) {
  const res = await baseUrl.get(`api/v1/blogs`, { params: params });
  return res.data;
}

export async function getSingleBlogBySlugApi(blogSlug) {
  const res = await baseUrl.get(`api/v1/blogs/singleBlog/${blogSlug}`);
  return res.data;
}

// dodati ovo dole

export async function findSingleBlogApi(blogId) {
  const res = await baseUrl.get(`api/v1/blogs/${blogId}`);
  return res.data;
}

export async function updateBlogApi(id, body) {
  const res = await baseUrl.patch(`api/v1/blogs/${id}`, body, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export async function createBlogApi(blog) {
  const res = await baseUrl.post(`api/v1/blogs`, blog, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

// --- BLOGS END ---

// --- TAGS ---

export async function findAllTagsApi() {
  const res = await baseUrl.get('api/v1/tags');
  return res.data;
}

export async function findPopularTagsApi() {
  const res = await baseUrl.get('api/v1/tags/mostPopularTags');
  return res.data;
}

export async function deleteTagApi(id) {
  const res = await baseUrl.delete(`api/v1/tags/${id}`);
  return res.data;
}

export async function updateTagApi(id, name) {
  const res = await baseUrl.patch(`api/v1/tags/${id}`, { name: name });
  return res.data;
}

export async function createTagApi(body) {
  const res = await baseUrl.post(`api/v1/tags`, body);
  return res.data;
}

// --- TAGS END ---

// --- CATEGORIES ---

export async function findAllCategoriesApi() {
  const res = await baseUrl.get('api/v1/categories');
  return res.data;
}

export async function deleteCategoryApi(id) {
  const res = await baseUrl.delete(`/api/v1/categories/${id}`);
  return res.data;
}

export async function updateCategoryApi(id, name) {
  const res = await baseUrl.patch(`/api/v1/categories/${id}`, { name });
  return res.data;
}

export async function createCategoryApi(name) {
  const res = await baseUrl.post(`/api/v1/categories`, name);
  return res.data;
}

// --- CATEGORIES END ---

// --- STATISTICS ---

export async function getBlogPerCategoryPercentApi() {
  const res = await baseUrl.get(`/api/v1/blogs/stats/categories`);
  return res.data;
}

export async function getTagsStats() {
  const res = await baseUrl.get(`/api/v1/blogs/stats/tags`);
  return res.data;
}

export async function getCommentsStats() {
  const res = await baseUrl.get(`/api/v1/blogs/stats/comments`);
  return res.data;
}

// --- STATISTICS END ---
