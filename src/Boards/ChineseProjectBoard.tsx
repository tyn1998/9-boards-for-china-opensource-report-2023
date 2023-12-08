import { BaseBoard } from './BaseBoard';
import { IndexNumber } from './IndexNumber';
import { NameWithIcon } from './NameWithIcon';
import { OpenRank } from './OpenRank';
import { useData } from './useData';
import { Integer } from './Integer';

import { createColumnHelper } from '@tanstack/react-table';

type ChineseProject = {
  no: number;
  logo: string;
  name: string; // 项目名称
  openrank: number;
  delta: number | '-';
  repo_count: number;
  participant_count: number;
  platform: string[];
  foundation: string;
}

const columnHelper = createColumnHelper<ChineseProject>();

const generateColumns = (size: 'small' | 'large') => [
  columnHelper.accessor('no', {
    cell: info => <IndexNumber value={info.getValue()} />,
    header: () => '#',
    size: size === 'small' ? 30 : 60,
  }),
  columnHelper.accessor(row => [row.logo, row.name], {
    id: 'repository',
    cell: info => <NameWithIcon size={size} icon={info.getValue()[0]} name={info.getValue()[1]} />,
    header: () => '项目名称',
    size: size === 'small' ? 150 : 200,
  }),
  columnHelper.accessor(row => [row.delta, row.openrank], {
    id: 'openrank',
    cell: info => <OpenRank delta={info.getValue()[0]} openrank={Number(info.getValue()[1])} />,
    header: () => 'OpenRank',
    size: size === 'small' ? 120 : 200,
  }),
  // 仓库个数
  columnHelper.accessor('repo_count', {
    cell: info => <Integer value={info.getValue()} />,
    header: () => '仓库个数',
    size: size === 'small' ? 120 : 100,
  }),
  // 参与人数
  columnHelper.accessor('participant_count', {
    cell: info => <Integer value={info.getValue()} />,
    header: () => '参与人数',
    size: size === 'small' ? 120 : 100,
  }),
  // 托管平台
  columnHelper.accessor('platform', {
    cell: info => info.getValue().join(' & '),
    header: () => '托管平台',
    size: size === 'small' ? 120 : 100,
  }),
  // 基金会
  columnHelper.accessor('foundation', {
    cell: info => info.getValue(),
    header: () => '基金会',
    size: size === 'small' ? 120 : 200,
  }),
];

interface RepositoryBoardProps {
  size: 'small' | 'large';
}

export const ChineseProjectBoard = ({ size }: RepositoryBoardProps) => {
  const data = useData<ChineseProject>('https://oss.x-lab.info/frank_zsy/chinese_project.json');

  return <BaseBoard size={size} columns={generateColumns(size)} data={data.slice(0, size === 'small' ? 10 : 30)} />
}