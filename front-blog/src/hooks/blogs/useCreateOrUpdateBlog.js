import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import { createBlogApi, updateBlogApi } from '../../api/actions';
import toast from 'react-hot-toast';

export function useCreateOrUpdateBlog(setSettings) {
  const { blogSlug } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createOrUpdateBlog, isLoading: isCreatingOrUpdateing } =
    useMutation({
      mutationFn: ({ id, blog }) =>
        blogSlug ? updateBlogApi(id, blog) : createBlogApi(blog),
      onSuccess: (res) => {
        if (blogSlug) {
          queryClient.invalidateQueries(['blog', blogSlug]);
        }
        queryClient.invalidateQueries(['blogs', 'page=1']);
        toast.success(
          `Blog has been ${blogSlug ? 'updated' : 'created'} successfully`
        );
        navigate(`/blog/${res.data.document.slug}`);
      },
      onError: (err) => {
        const serverMsg = err?.response?.data?.message;
        typeof serverMsg === 'string' && toast.error(serverMsg);
        setSettings((prev) => ({
          ...prev,
          serverValidation: serverMsg,
        }));
      },
    });

  return { createOrUpdateBlog, isCreatingOrUpdateing };
}
