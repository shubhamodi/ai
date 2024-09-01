import './ProgressBar.css'; // Import the updated CSS file

const ProgressBar = ({ percentFilled }) => (
  <div className="progress-bar-container">
    <div
      className={`progress-bar-fill ${
        percentFilled >= 75
          ? 'deepPurple'
          : percentFilled >= 50
          ? 'royalPurple'
          : percentFilled >= 25
          ? 'grapePurple'
          : 'plumPurple'
      }`}
      style={{ width: `${percentFilled}%` }}
    >
      
    </div>
  </div>
);

export default ProgressBar;
