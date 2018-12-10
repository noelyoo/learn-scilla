import React from 'react';
import { Link } from 'react-router-dom';
import { IChapterInstruction } from '../../typings';

interface IProps {
  t: (key: string) => string;
  chapterList: IChapterInstruction[];
  progress?: any;
  isAuth: boolean;
}

const ChapterList: React.SFC<IProps> = (props) => {
  const { t, isAuth, chapterList, progress } = props;
  const list = chapterList || [];

  const result = list.map((item, index) => {
    const chapterNum: number = index + 1;
    const chapterKey: string = `chapter${chapterNum}`;

    const progressProfile = progress || {};
    const chapterProgressNum: number = progressProfile[chapterKey] || 0;

    const lessons: string[] = item.lessons || [];
    const totalNum: number = lessons.length;

    const progressText = isAuth ? `(${chapterProgressNum}/${totalNum})` : '';
    const lessonToStart = totalNum <= chapterProgressNum ? totalNum : chapterProgressNum + 1;

    const startingChapterPath = `/chapter/${chapterNum}/lesson/${lessonToStart}`;
    return (
      <div key={startingChapterPath} className="m-2">
        <Link
          className="btn btn-primary btn-block text-left"
          to={startingChapterPath}
          aria-label={'start chapter'}
        >
          <small> {`${t('chapter.chapter')} ${chapterNum} :`}</small>
          {` ${item.title} `}
          <small>{progressText}</small>
        </Link>
      </div>
    );
  });

  return <div>{result}</div>;
};

export default ChapterList;
