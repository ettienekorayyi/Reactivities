using Microsoft.AspNetCore.Http;
using Application.Photos;

namespace Application.Interface
{
    public interface IPhotoAccessor
    {
        PhotoUploadResult AddPhoto(IFormFile file);
        string DeletePhoto(string publicId);

    }
}