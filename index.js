const parse = require('csv-parse/lib/sync')
const wget = require('wget-improved')
const fs = require('fs')

const download = async (video, index, length) => {
  const title = `${video['Video Title']}.mp4`

  const path = `/tmp/${title}`

  return new Promise((resolve, reject) => {
    const download = wget.download(video['Download URL'], path)

    download.on('end', output => {
      console.log(`done with ${title} (${index + 1}/${length})`)
      resolve()
    })
  })
}

fs.readFile(__dirname + '/user_videos.csv', async (err, file) => {
  if (err) {
    throw err
  }

  const str = file.toString()

  const data = parse(str, {
    columns: true,
  })

  for (let i = 0; i < data.length; i++) {
    await download(data[i], i, data.length)
  }
})
