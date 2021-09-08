import React from 'react';
import { Card } from 'react-bootstrap';
import Ghost from 'components/Phasmo';

const Evidence = ({ evidence, clue = null, click }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Body>
          <Card.Title as='h4'>
            <strong>{evidence.evidenceNameFull}</strong>
          </Card.Title>

        <Card.Text as='div'>
                  <label>Clue:  </label>
                  <input type="checkbox" className="checkbox" value="" name="true" filter={evidence.evidenceName} onChange={click}></input>
        </Card.Text>
        <Card.Text as='div'>
                  <label>Can't be:  </label>
                  <input type="checkbox" className="checkbox" value="" name="false" filter={evidence.evidenceName} onChange={click}></input>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Evidence;