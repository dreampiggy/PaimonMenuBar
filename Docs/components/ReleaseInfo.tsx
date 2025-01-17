import type { AppReleaseData } from '../pages/types'

const reactionToEmoji = {
  '+1': '👍',
  '-1': '👎',
  laugh: '😂',
  confused: '😕',
  heart: '❤️',
  hooray: '🎉',
  rocket: '🚀',
  eyes: '👀',
} as const
type reactionKeys = keyof typeof reactionToEmoji

const formatRelativeDate = (publishedAt: string) => {
  const publishedDate = new Date(publishedAt)
  const deltaTime = (publishedDate.getTime() - Date.now()) / 1000

  const formatter = new Intl.RelativeTimeFormat()
  if (deltaTime > -60 * 60) {
    return formatter.format(Math.floor(deltaTime / 60), 'minute')
  }
  if (deltaTime > -24 * 60 * 60) {
    return formatter.format(Math.floor(deltaTime / 60 / 60), 'hour')
  }
  if (deltaTime > -7 * 24 * 60 * 60) {
    return formatter.format(Math.floor(deltaTime / 60 / 60 / 24), 'day')
  }
  return formatter.format(Math.floor(deltaTime / 60 / 60 / 24 / 7), 'week')
}

const ReleaseInfo = ({
  htmlUrl,
  publishedAt,
  downloadCount,
  reactions,
}: {
  htmlUrl: string
  publishedAt: string
  downloadCount: number
  reactions: AppReleaseData['reactions']
}) => {
  const reactionsNonZero = Object.entries(reactions ?? {}).filter(
    ([key, count]) => key !== 'total_count' && count > 0
  ) as Array<[reactionKeys, number]>

  return (
    <div className="flex flex-wrap items-center text-xs gap-x-2 py-2 opacity-60 hover:opacity-80 transition-all duration-150">
      <span>{formatRelativeDate(publishedAt)},</span>
      <span>
        {downloadCount} {downloadCount > 1 ? 'downloads' : 'download'},
      </span>

      <a href={htmlUrl} target="_blank" rel="noopener noreferrer">
        goto release.
      </a>

      {reactionsNonZero.map(([key, val]: [key: reactionKeys, val: number]) => (
        <span key={key}>
          {reactionToEmoji[key]} {val}
        </span>
      ))}
    </div>
  )
}

export default ReleaseInfo
