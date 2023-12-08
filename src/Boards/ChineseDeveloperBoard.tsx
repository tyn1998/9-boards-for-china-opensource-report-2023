import { BaseBoard } from './BaseBoard';
import { IndexNumber } from './IndexNumber';
import { NameWithIcon } from './NameWithIcon';
import { OpenRank } from './OpenRank';
import { useData } from './useData';

import { createColumnHelper } from '@tanstack/react-table';

type ChineseDeveloper = {
  no: number;
  logo: string;
  name: string; // 开发者名称
  openrank: number;
  delta: number | '-';
  representatives: string[];
  platform: string;
}

const columnHelper = createColumnHelper<ChineseDeveloper>();

const generateColumns = (size: 'small' | 'large') => [
  columnHelper.accessor('no', {
    cell: info => <IndexNumber value={info.getValue()} />,
    header: () => '#',
    size: size === 'small' ? 30 : 60,
  }),
  columnHelper.accessor(row => [row.logo, row.name], {
    id: 'bot',
    cell: info => <NameWithIcon size={size} icon={info.getValue()[0]} name={info.getValue()[1]} rounded />,
    header: () => '开发者 ID',
    size: size === 'small' ? 120 : 150,
  }),
  columnHelper.accessor(row => [row.delta, row.openrank], {
    id: 'openrank',
    cell: info => <OpenRank delta={info.getValue()[0]} openrank={Number(info.getValue()[1])} />,
    header: () => 'OpenRank',
    size: size === 'small' ? 120 : 150,
  }),
  // 托管平台
  columnHelper.accessor('platform', {
    cell: info => info.getValue(),
    header: () => '托管平台',
    size: size === 'small' ? 120 : 100,
  }),
  // 代表仓库
  columnHelper.accessor('representatives', {
    cell: info => info.getValue().slice(0,3).join('; '),
    header: () => '代表仓库',
    size: size === 'small' ? 120 : 500,
  }),
];

interface RepositoryBoardProps {
  size: 'small' | 'large';
}

export const ChineseDeveloperBoard = ({ size }: RepositoryBoardProps) => {
  const data = useData<ChineseDeveloper>('https://oss.x-lab.info/frank_zsy/chinese_developer.json');

  return <BaseBoard size={size} columns={generateColumns(size)} data={data.slice(0, size === 'small' ? 10 : 30)} />
}