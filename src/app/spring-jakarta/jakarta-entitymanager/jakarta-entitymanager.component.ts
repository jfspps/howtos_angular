import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-jakarta-entitymanager',
  templateUrl: './jakarta-entitymanager.component.html',
  styleUrls: ['./jakarta-entitymanager.component.css']
})
export class JakartaEntitymanagerComponent implements OnInit {

  response: HighlightResult;

  lang = ["java", "xml"];

  constructor() { }

  ngOnInit(): void {
  }

  persistenceXML = `
<persistence xmlns="http://xmlns.jcp.org/xml/ns/persistence"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="2.2"
  xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence 
  http://xmlns.jcp.org/xml/ns/persistence/persistence_2_2.xsd">

  <!-- Define persistence unit below -->
  <persistence-unit name="my-persistence-unit">
  </persistence-unit>

</persistence>`;

  entityManagerClass = `
  public class AppProducers{

    // use @PersistenceContext(unitName = "my-persistence-unit") 
    // if there are >1 units

    // Recall, the EntityManager is assumed as CDI managed bean with 
    // @Produces and allows EntityManager instances to be injected

    @Produces
    @PersistenceContext
    EntityManager entityManager;

  }`;

  CRUD_entityManager = `
@Stateless
public class PersistenceService {

    @Inject
    EntityManager entityManager;

    // use the QueryService methods instead of redefining them here
    @Inject
    QueryService queryService;

    public void saveDepartment(Department department) {
        entityManager.persist(department);
    }

    public void removeParkingSpace(Long employeeId) {
        Employee employee = queryService.findEmployeeById(employeeId);
        ParkingSpace parkingSpace = employee.getParkingSpace();

        // update employee before removing (one-to-one mapping in place)
        employee.setParkingSpace(null);

        entityManager.remove(parkingSpace);
    }

    public void saveEmployee(Employee employee, ParkingSpace parkingSpace) {
        employee.setParkingSpace(parkingSpace);

        // this will also persist the ParkingSpace entity (explained below)
        entityManager.persist(employee);
    }

    public void updateDepartment(Department department) {
        entityManager.merge(department);
    }
}`;

  queryServiceClass = `
@Stateless
public class QueryService {

    @Inject
    EntityManager entityManager;

    @PostConstruct
    private void init() {
    }

    @PreDestroy
    private void destroy() {
    }

    public List<Department> getAllDepartments() {
        return entityManager.createNamedQuery(
          Department.GET_DEPARTMENT_LIST, Department.class).getResultList();
    }

    public List<String> getAllDepartmentNames() {
        return entityManager.createNamedQuery(
          Department.GET_DEPARTMENT_NAMES, String.class).getResultList();
    }

    public List<ParkingSpace> getAllAllocatedParkingSpaces() {
        return entityManager.createNamedQuery(
          Employee.GET_ALL_PARKING_SPACES, ParkingSpace.class).getResultList();
    }

    public Collection<Object[]> getEmployeeProjection() {
        return entityManager.createNamedQuery(
          Employee.EMPLOYEE_PROJECTION, Object[].class).getResultList();
    }

    public List<EmployeeDetails> getEmployeeDetails() {
        return entityManager.createNamedQuery(
          Employee.EMPLOYEE_CONSTRUCTOR_PROJ, EmployeeDetails.class).getResultList();
    }

    public Department findDepartmentById(Long id) {
        return entityManager.find(Department.class, id);
    }

    public Employee findEmployeeById(Long id) {
        return entityManager.find(Employee.class, id);
    }
}`;

  cascadingOps = `
public class Employee extends AbstractEntity {

  // other fields and methods

  @OneToOne(
    mappedBy = "employee", 
    fetch = FetchType.LAZY, 
    cascade = CascadeType.PERSIST)
  private ParkingSpace parkingSpace;

}`;

  persistenceXMLoptions = `
<persistence xmlns="http://xmlns.jcp.org/xml/ns/persistence"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="2.2"
  xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence 
  http://xmlns.jcp.org/xml/ns/persistence/persistence_2_2.xsd">

  <!-- Define persistence unit below -->
  <persistence-unit name="my-persistence-unit" transaction-type="JTA">

    <provider>
      <!-- Override the default application server JPA provider -->
    </provider>

    <jta-data-source>
      java:app/pathTo/theDB
    </jta-data-source>

    <exclude-unlisted-classes>false</exclude-unlisted-classes>

    <properties>
      <!-- Set the application deployment properties -->

      <property name="javax.persistence.schema-generation.database.action" 
        value="drop-and-create" />

      <!-- Handle scripts (if value="drop" then the create-target is not expected etc.) -->
      <property name="javax.persistence.schema-generation.scripts.action"
        value="drop-and-create"/>

      <property name="javax.persistence.schema-generation.scripts.drop-target"
        value="file:///c:/scripts/dropped.ddl"/>

      <property name="javax.persistence.schema-generation.scripts.create-target"
        value="file:///c:/scripts/created.ddl"/>

    </properties>

  </persistence-unit>

</persistence>`;

  datasourceAnnot = `
@DataSourceDefinition(
  name = "java:app/pathTo/theDB",
  className = "org.apache.derby.jdbc.ClientDriver",
  url = "jdbc:derby://localhost:1976/theDB",
  user = "usernameHere",
  password = "pwd")
@Stateless
public class SomeService {

  @Inject
  EntityManager entityManager;

  // other methods and fields

}`;

  datasourceXML = `
<web-app ...>

    <data-source>
        <name>java:app/pathTo/theDB</name>
        <class-name>org.apache.derby.jdbc.ClientDriver</class-name>
        <url>jdbc:derby://localhost:1976/theDB</url>
        <user>usernameHere</user>
        <password>pwd</password>
    </data-source>

</web-app>
    `;
    
  onHighlight(e) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      second_best: '{...}',
      top: '{...}',
      value: '{...}'
    }
  }
}
