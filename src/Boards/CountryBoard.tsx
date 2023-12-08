import { BaseBoard } from './BaseBoard';
import { IndexNumber } from './IndexNumber';
import { OpenRank } from './OpenRank';
import { useData } from './useData';
import { Integer } from './Integer';

import { createColumnHelper } from '@tanstack/react-table';

import styles from './index.module.css';

type Country = {
  no: number;
  flag_code: string;
  name: string; // 国家或地区名称
  openrank: number;
  delta: number | '-';
  repo_count: number;
  participant_count: number;
}

const columnHelper = createColumnHelper<Country>();

const generateColumns = (size: 'small' | 'large') => [
  columnHelper.accessor('no', {
    cell: info => <IndexNumber value={info.getValue()} />,
    header: () => '#',
    size: size === 'small' ? 30 : 60,
  }),
  // 国家或地区
  columnHelper.accessor(row => [row.flag_code, row.name], {
    id: 'country',
    cell: info => (
      <div className={styles.flagContainer}>
        <span className={size === 'small' ? styles.flagSmall : styles.flagLarge}>{info.getValue()[0]}</span>
        <span>{info.getValue()[1]}</span>
      </div>
    ),
    header: () => '国家或地区',
    size: size === 'small' ? 130 : 200,
  }), 
  columnHelper.accessor(row => [row.delta, row.openrank], {
    id: 'openrank',
    cell: info => <OpenRank delta={info.getValue()[0]} openrank={Number(info.getValue()[1])} />,
    header: () => 'OpenRank',
    size: size === 'small' ? 140 : 200,
  }),
  // 参与人数
  columnHelper.accessor('participant_count', {
    cell: info => <Integer value={info.getValue()} />,
    header: () => '参与人数',
    size: size === 'small' ? 120 : 100,
  }),
];

interface RepositoryBoardProps {
  size: 'small' | 'large';
}

export const CountryBoard = ({ size }: RepositoryBoardProps) => {
  const data = useData<Country>('https://oss.x-lab.info/frank_zsy/country.json');

  return <BaseBoard size={size} columns={generateColumns(size)} data={data.slice(0, size === 'small' ? 10 : 20)} />
}