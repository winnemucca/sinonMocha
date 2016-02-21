'use strict';

var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;

chai.should();


describe('sinon tests', function() {
	var student, schedule;

	beforeEach(function() {
		student = {
			dropClass: function(classId, cb) {

				if(!!cb.dropClass) {
					cb.dropClass();
				} else {
					cb();
				}
			}
		}

		schedule = {
			dropClass: function() {
				console.log('class dropped');
			}
		};
	});

	describe('student.dropClass', function() {
		it('should call the callback', function() {
			var spy = sinon.spy();
			student.dropClass(1, spy);

			expect(spy.called).to.be.true;
		});

		it('should call the callback and log to the console', function() {
			function onClassDropped() {
				console.log('onClassDropped was called');
			}

			var spy = sinon.spy(onClassDropped);

			student.dropClass(1,spy);
			spy.called.should.be.true;
		});

		it('should call the callback even if it\'s', function() {

			sinon.spy(schedule, 'dropClass');
			student.dropClass(1, schedule);
			schedule.dropClass.called.should.be.true;
		})
	})
});
