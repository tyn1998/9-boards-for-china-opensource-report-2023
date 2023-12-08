import { BaseBoard } from './BaseBoard';
import { IndexNumber } from './IndexNumber';
import { NameWithIcon } from './NameWithIcon';
import { OpenRank } from './OpenRank';
import { useData } from './useData';
import { Integer } from './Integer';

import { createColumnHelper } from '@tanstack/react-table';

import styles from './index.module.css';

type GlobalCompany = {
  no: number;
  logo: string;
  name: string; // 企业名称
  openrank: number;
  delta: number | '-';
  repo_count: number;
  participant_count: number;
  representatives: string[]; // 代表项目
  flag_code: string;
  country: string;
}

const columnHelper = createColumnHelper<GlobalCompany>();

const generateColumns = (size: 'small' | 'large') => [
  columnHelper.accessor('no', {
    cell: info => <IndexNumber value={info.getValue()} />,
    header: () => '#',
    size: size === 'small' ? 30 : 60,
  }),
  columnHelper.accessor(row => [row.logo, row.name], {
    id: 'company',
    cell: info => <NameWithIcon size={size} icon={info.getValue()[0]} name={info.getValue()[1]} />,
    header: () => '企业名称',
    size: size === 'small' ? 140 : 150,
  }),
  columnHelper.accessor(row => [row.delta, row.openrank], {
    id: 'openrank',
    cell: info => <OpenRank delta={info.getValue()[0]} openrank={Number(info.getValue()[1])} />,
    header: () => 'OpenRank',
    size: size === 'small' ? 140 : 200,
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
  // 代表仓库
  columnHelper.accessor('representatives', {
    cell: info => info.getValue().slice(0,3).join('; '),
    header: () => '代表仓库',
    size: size === 'small' ? 120 : 300,
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

export const GlobalCompanyBoard = ({ size }: RepositoryBoardProps) => {
  const data = useData<GlobalCompany>('https://oss.x-lab.info/frank_zsy/global_company.json');

  return <BaseBoard size={size} columns={generateColumns(size)} data={data.slice(0, size === 'small' ? 10 : 20)} />
}