import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TextInput, Button } from '@mantine/core';
import { addSkill, removeSkill } from '@/features/modal/filtersSlice';
import { fetchVacancies } from '@/features/modal/modalSlice';
import { useAppDispatch } from '@/hooks/useReduxHooks';
import type { RootState } from '@/app/store';
import { useSearchParams, useParams } from 'react-router-dom';
import style from './index.module.scss';

export default function SectionFilter() {
  const dispatch = useAppDispatch();
  const { skills, searchText } = useSelector(
    (state: RootState) => state.filters
  );
  const [skillInput, setSkillInput] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const { city } = useParams<{ city?: string }>();

  const updateUrlParams = (newSkills = skills, newText = searchText) => {
    const params = new URLSearchParams();
    if (newText) params.set('q', newText.trim());
    newSkills.forEach((s) => params.append('skills', s));
    setSearchParams(params, { replace: true });
  };

  useEffect(() => {
    const hasAny =
      searchParams.get('q') || searchParams.getAll('skills').length;
    if (!hasAny) updateUrlParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    const updatedSkills = [...skills, trimmed];
    dispatch(addSkill(trimmed));
    dispatch(
      fetchVacancies({
        city: city ?? undefined,
        skills: updatedSkills,
        text: searchText.trim(),
      })
    );
    updateUrlParams(updatedSkills);
    setSkillInput('');
  };

  const handleRemoveSkill = (skill: string) => {
    const updatedSkills = skills.filter((s) => s !== skill);
    dispatch(removeSkill(skill));
    dispatch(
      fetchVacancies({
        city: city ?? '',
        skills: updatedSkills,
        text: searchText.trim(),
      })
    );
    updateUrlParams(updatedSkills);
  };

  return (
    <div className={style.sectionFilter}>
      <div className={style.blockFilter}>
        <p>Ключевые навыки</p>

        <div className={style.inputRow}>
          <TextInput
            className={style.input}
            placeholder="Навык"
            value={skillInput}
            onChange={(e) => setSkillInput(e.currentTarget.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
          />
          <Button className={style.plusBtn} onClick={handleAddSkill}>
            +
          </Button>
        </div>

        <div className={style.grid}>
          {skills.map((skill) => (
            <span key={skill} className={style.skill}>
              <p>{skill}</p>
              <Button
                variant="subtle"
                size="xs"
                className={style.deleteBtn}
                onClick={() => handleRemoveSkill(skill)}
              >
                ✕
              </Button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
