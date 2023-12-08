import { BaseBoard } from './BaseBoard';
import { IndexNumber } from './IndexNumber';
import { NameWithIcon } from './NameWithIcon';
import { OpenRank } from './OpenRank';
import { useData } from './useData';
import { Integer } from './Integer';

import { createColumnHelper } from '@tanstack/react-table';

type GlobalBot = {
  no: number;
  avatar_url: string;
  name: string; // 机器人名称
  events: number; // 事件数量
  delta: number | '-';
  serving_repo_count: number; // 服务仓库数
  representative: string; // 所服务仓库中的代表仓库
}

const columnHelper = createColumnHelper<GlobalBot>();

const generateColumns = (size: 'small' | 'large') => [
  columnHelper.accessor('no', {
    cell: info => <IndexNumber value={info.getValue()} />,
    header: () => '#',
    size: size === 'small' ? 30 : 60,
  }),
  columnHelper.accessor(row => [row.avatar_url, row.name], {
    id: 'bot',
    cell: info => <NameWithIcon size={size} icon={info.getValue()[0]} name={info.getValue()[1]} rounded />,
    header: () => '机器人 ID',
    size: size === 'small' ? 120 : 150,
  }),
  columnHelper.accessor(row => [row.delta, row.events], {
    id: 'events',
    cell: info => <OpenRank delta={info.getValue()[0]} openrank={Number(info.getValue()[1])} decimal={false} />,
    header: () => '事件数量',
    size: size === 'small' ? 100 : 150,
  }),
  // 服务仓库数
  columnHelper.accessor('serving_repo_count', {
    cell: info => <Integer value={info.getValue()} />,
    header: () => '服务仓库数',
    size: size === 'small' ? 120 : 100,
  }),
  // 代表仓库
  columnHelper.accessor('representative', {
    cell: info => info.getValue(),
    header: () => '代表仓库',
    size: size === 'small' ? 120 : 250,
  }),
];

interface RepositoryBoardProps {
  size: 'small' | 'large';
}

export const GlobalBotBoard = ({ size }: RepositoryBoardProps) => {
  const data = useData<GlobalBot>('https://oss.x-lab.info/2023report/global_bot.json');

  return <BaseBoard size={size} columns={generateColumns(size)} data={data.slice(0, size === 'small' ? 10 : 30)} />
}