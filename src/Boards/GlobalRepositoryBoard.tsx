import { BaseBoard } from './BaseBoard';
import { IndexNumber } from './IndexNumber';
import { NameWithIcon } from './NameWithIcon';
import { OpenRank } from './OpenRank';
import { useData } from './useData';
import { Integer } from './Integer';

import { createColumnHelper } from '@tanstack/react-table';

import styles from './index.module.css';

type GlobalRepository = {
  no: number; // 序号
  logo: string;
  name: string; // 仓库名称
  openrank: number;
  delta: number | '-';
  participant_count: number;
  license: string;
  platform: string;
  flag_code: string;
  country: string; // 国家或地区
}

const columnHelper = createColumnHelper<GlobalRepository>();

const generateColumns = (size: 'small' | 'large') => [
  columnHelper.accessor('no', {
    cell: info => <IndexNumber value={info.getValue()} />,
    header: () => '#',
    size: size === 'small' ? 30 : 60,
  }),
  columnHelper.accessor(row => [row.logo, row.name], {
    id: 'repository',
    cell: info => <NameWithIcon size={size} icon={info.getValue()[0]} name={info.getValue()[1]} />,
    header: () => '仓库名称',
    size: size === 'small' ? 150 : 300,
  }),
  columnHelper.accessor(row => [row.delta, row.openrank], {
    id: 'openrank',
    cell: info => <OpenRank delta={info.getValue()[0]} openrank={Number(info.getValue()[1])} />,
    header: () => 'OpenRank',
    size: size === 'small' ? 120 : 200,
  }),
  // 参与人数
  columnHelper.accessor('participant_count', {
    cell: info => <Integer value={info.getValue()} />,
    header: () => '参与人数',
    size: size === 'small' ? 120 : 100,
  }),
  //许可证
  columnHelper.accessor('license', {
    cell: info => info.getValue(),
    header: () => '许可证',
    size: size === 'small' ? 120 : 250,
  }),
  // 托管平台
  columnHelper.accessor('platform', {
    cell: info => info.getValue(),
    header: () => '托管平台',
    size: size === 'small' ? 120 : 100,
  }),
  // 国家或地区
  columnHelper.accessor(row => [row.flag_code, row.country], {
    id: 'country',
    cell: info => (
      <div className={styles.flagContainer}>
        <span className={size === 'small' ? styles.flagSmall : styles.flagLarge}>{info.getValue()[0]}</span>
        <span>{info.getValue()[1]}</span>
      </div>
    ),
    header: () => '国家',
    size: size === 'small' ? 130 : 200,
  }), 
];

interface RepositoryBoardProps {
  size: 'small' | 'large';
}

export const GlobalRepositoryBoard = ({ size }: RepositoryBoardProps) => {
  const data = useData<GlobalRepository>('https://oss.x-lab.info/frank_zsy/global_repository.json');

  return <BaseBoard size={size} columns={generateColumns(size)} data={data.slice(0, size === 'small' ? 10 : 30)} />
}