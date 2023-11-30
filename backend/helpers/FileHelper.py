from classes.File import File

file_handler = File()

# upload files as an attachment to task


def upload_files(files):
    result = file_handler.upload(files)
    return result


def get_file(id):
    result = file_handler.get(id)
    return result
