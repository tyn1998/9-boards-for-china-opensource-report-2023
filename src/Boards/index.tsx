import { AppContext } from '../AppContext';
import { ScreenResolution } from '../constants';
import { BoardContainer } from './BoardContainer';
import { GlobalRepositoryBoard } from './GlobalRepositoryBoard';
import { ChineseProjectBoard } from './ChineseProjectBoard';
import { GlobalCompanyBoard } from './GlobalCompanyBoard';
import { GlobalFoundationBoard } from './GlobalFoundationBoard';
import { ChineseCompanyBoard } from './ChineseCompanyBoard';
import { CountryBoard } from './CountryBoard';
import { GlobalDeveloperBoard } from './GlobalDeveloperBoard';
import { ChineseDeveloperBoard } from './ChineseDeveloperBoard';
import { GlobalBotBoard } from './GlobalBotBoard';

import { useContext } from 'react';

import styles from './index.module.css';

export const Boards = () => {
  const { screenResolution } = useContext(AppContext);

  if (screenResolution === ScreenResolution.Large) {
    return (
      <div className={styles.bg}>
        <BoardContainer size='large' title='2.1 全球开源仓库 OpenRank 排行榜（Top 30）'>
          <GlobalRepositoryBoard size='large' />
        </BoardContainer>
        <BoardContainer size='large' title='2.2 中国开源项目 OpenRank 排行榜（Top 30）'>
          <ChineseProjectBoard size='large' />
        </BoardContainer>
        <BoardContainer size='large' title='2.3 全球企业 OpenRank 排行榜（Top 20）'>
          <GlobalCompanyBoard size='large' />
        </BoardContainer>
        <BoardContainer size='large' title='2.4 中国企业 OpenRank 排行榜（Top 20）'>
          <ChineseCompanyBoard size='large' />
        </BoardContainer>
        <BoardContainer size='large' title='2.5 全球基金会 OpenRank 排行榜（Top 10）'>
          <GlobalFoundationBoard size='large' />
        </BoardContainer>
        <BoardContainer size='large' title='2.6 国家和地区 OpenRank 排行榜（Top 20）'>
          <CountryBoard size='large' />
        </BoardContainer>
        <BoardContainer size='large' title='2.7 全球开发者 OpenRank 排行榜（Top 30）'>
          <GlobalDeveloperBoard size='large' />
        </BoardContainer>
        <BoardContainer size='large' title='2.8 中国开发者 OpenRank 排行榜（Top 30）'>
          <ChineseDeveloperBoard size='large' />
        </BoardContainer>
        <BoardContainer size='large' title='2.9 GitHub 协作机器人事件数量排行榜（Top 50）'>
          <GlobalBotBoard size='large' />
        </BoardContainer>
      </div>
    )
  }
}