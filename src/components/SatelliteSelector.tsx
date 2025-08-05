import Select, { MultiValue } from 'react-select';

interface Satellite {
  satid: number;
  satname: string;
}

interface OptionType {
  value: number;
  label: string;
}

interface SatelliteSelectorProps {
  satellites: Satellite[];
  loading: boolean;
  onChange: (selectedOptions: Satellite[]) => void;
}

const SatelliteSelector: React.FC<SatelliteSelectorProps> = ({
  satellites,
  loading,
  onChange,
}) => {
  // Removed unused actionMeta to eliminate unused variable warning
  const handleChange = (newValue: MultiValue<OptionType>) => {
    const selected = (newValue ?? []).map(opt => ({
      satid: opt.value,
      satname: opt.label,
    }));
    onChange(selected);
  };

  const options: OptionType[] = satellites.map(sat => ({
    value: sat.satid,
    label: sat.satname,
  }));

  return (
    <div className="satellite-selector">
      <Select
        isMulti
        options={options}
        onChange={handleChange}
        isLoading={loading}
        placeholder={loading ? 'Loading satellites...' : 'Select satellites...'}
        noOptionsMessage={() => (loading ? 'Loading...' : 'No satellites found')}
        classNamePrefix="react-select"
        styles={{
          control: base => ({
            ...base,
            backgroundColor: '#0f172a',
            borderColor: '#334155',
            color: '#f8fafc',
            boxShadow: 'none',
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#1e293b' : '#0f172a',
            color: '#f8fafc',
          }),
          multiValue: base => ({
            ...base,
            backgroundColor: '#1e293b',
            color: '#f1f5f9',
          }),
          input: base => ({
            ...base,
            color: '#f8fafc',
          }),
          menu: base => ({
            ...base,
            backgroundColor: '#0f172a',
          }),
        }}
      />
    </div>
  );
};

export default SatelliteSelector;
