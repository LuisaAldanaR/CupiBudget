import "../../../App.scss";

const CrudTableRow = ({ el}) => {
  let { level, mode,  name, validUntil, sniesCode, resolutionNumber, resolutionDate } = el;

  // Convert DateTime dates to Date objects
  const endDateCourseAsDate = new Date(resolutionDate);

  // Options to format the date in Spanish
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <tr>
      <th className="tdTableRow">{level}</th>
      <th className="tdTableRow">{mode}</th>
      <th className="tdTableRow">{name}</th>
      <td className="tdTableRow">{endDateCourseAsDate.toLocaleDateString('es-ES', options)}</td>
    </tr>
  );
};

export default CrudTableRow;
