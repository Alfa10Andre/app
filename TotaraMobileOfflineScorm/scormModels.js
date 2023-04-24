/**
 * This file is part of Totara Enterprise.
 *
 * Copyright (C) 2020 onwards Totara Learning Solutions LTD
 *
 * Totara Enterprise is provided only to Totara Learning Solutions
 * LTD’s customers and partners, pursuant to the terms and
 * conditions of a separate agreement with Totara Learning
 * Solutions LTD or its affiliate.
 *
 * If you do not have an agreement with Totara Learning Solutions
 * LTD, you may not access, use, modify, or distribute this software.
 * Please contact [sales@totaralearning.com] for more information.
 * 
 * @author Simon Tegg <simon.tegg@totaralearning.com>
 */

function Interaction(values = {}) {
  return Object.assign(
    {
      id: "",
      // “true-false”, “choice”, “fill-in”, “long-fill-in”, “matching”, “performance”, “sequencing”, “likert”, “numeric” or “other”,
      type: "",
      objectives: {
        _count: 0
      },
      correct_responses: {
        _count: 0
      },
      timestamp: "",
      weighting: "",
      student_response: "",
      result: "",
      latency: "",
      description: ""
    },
    values
  );
}

function InteractionObjective(values = {}) {
  return Object.assign(
    {
      id: ""
    },
    values
  );
}

function InteractionCorrectResponse(values = {}) {
  return Object.assign(
    {
      pattern: ""
    },
    values
  );
}

function Objective(values = {}) {
  return Object.assign(
    {
      id: "",
      score: {
        raw: "",
        max: "",
        min: ""
      },
      status: "" // “passed”, “completed”, “failed”, “incomplete”, “browsed”, “not attempted”
    },
    values
  );
}

const Models = {
  interactions: Interaction,
  "interactions.objectives": InteractionObjective,
  "interactions.correct_responses": InteractionCorrectResponse,
  objectives: Objective
};

export default Models;
