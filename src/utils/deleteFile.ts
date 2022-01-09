const fs = require('fs-extra')


export const deleteFile = async (path: string) => {
    console.log('PATH', path);
    
    try {
        await fs.remove(path)
        console.log('success!')
      } catch (err) {
        console.error(err)
      }
}