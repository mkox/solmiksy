<?php

namespace Mkox\SolmikBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Mkox\SolmikBundle\Form;
use Mkox\SolmikBundle\Entity;

class CategoryController extends Controller {

    /**
     *
     * @var type Doctrine\ORM\EntityManager
     */
    protected $em;

    public function indexAction() {
        return $this->redirectToRoute('solmik-start');
    }

    /**
     * @Route("/solmik/category/create", name="solmik-category-create")
     * @Template()
     */
    public function createAction(Request $request) {

        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }

        $isAjax = $request->isXmlHttpRequest();

        // Create the form and inject the EntityManager
//        $form = new Form\CreateCategoryForm($this->em);

        $category = new Entity\Category();
        $form = $this->createForm(new Form\Type\CategoryType(), $category);

        $form->handleRequest($request);

//        if ($this->request->isPost()) {
//            $form->setData($this->request->getPost());

        if ($form->isValid()) {
//echo json_encode(array('form is valid'));
////echo new Response(json_encode($request));
////echo new Response(json_encode(array('name' => $request->request->get('name'))));
//exit;
            $this->em = $this->getDoctrine()->getManager();
            $this->em->persist($category);
            $this->em->flush();
            if ($isAjax) {
                echo new Response(json_encode(array('data' => $this->getRequest()->request->all(), 'errors' => (string) $form->getErrors(true, false))));
                exit;
            } else {
                return $this->redirectToRoute('solmik-start');
            }
        }
//        }
        if ($isAjax) {
            echo new Response(json_encode(array('data' => $this->getRequest()->request->all(), 'errors' => (string) $form->getErrors(true, false))));
            exit;
        } else {
            return array('form' => $form->createView());
        }
    }

    /**
     * @Route("/solmik/category/edit", name="solmik-category-edit")
     * @Template()
     */
    public function editAction(Request $request) {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }

//        $id = (int) $this->params()->fromRoute('id', 0);
        $id = $request->query->get('id');

        // Create the form and inject the EntityManager
//        $form = new Form\UpdateCategoryForm($this->em);
//        $category = $this->em->find('Solmik\Entity\Category', $id);
//        $form->bind($category);

        $category = $this->getDoctrine()
                ->getRepository('MkoxSolmikBundle:Category')
                ->find($id);
        $form = $this->createForm(new Form\Type\CategoryType(), $category);

        $form->handleRequest($request);

//        if ($this->request->isPost()) {
//            $form->setData($this->request->getPost());

        if ($form->isValid()) {
            // Save the changes
            $this->em = $this->getDoctrine()->getManager();
            $this->em->flush();
            return $this->redirectToRoute('solmik-start');
        }
//        }

        return array('form' => $form->createView());
    }

    /**
     * @Route("/solmik/category/delete", name="solmik-category-delete")
     * @Template()
     */
    public function deleteAction(Request $request) {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }

        $id = $request->query->get('id');
        if (!$id) {
            return $this->redirect()->toRoute('solmik');
        }

//dump($request->query->get('del'));
//dump($request);
//dump($request->request->get('del'));
//exit;
//        $request = $this->getRequest();
        if ($request->request->get('del')) {
//            $del = $request->getPost('del', 'No');
            $del = $request->request->get('del');

            if ($del == 'Yes') {
//                $id = (int) $request->getPost('id');
                $this->em = $this->getDoctrine()->getManager();
                $this->em->remove($this->em->find('MkoxSolmikBundle:Category', $id));
                $this->em->flush();
            }

            return $this->redirectToRoute('solmik-start');
        }

        return array(
            'id' => $id,
//            'category' => $this->em->find('MkoxSolmikBundle:Category', $id)
            'category' => $this->getDoctrine()->getRepository('MkoxSolmikBundle:Category')->find($id)
        );
    }

//    protected function attachDefaultListeners() {
//        parent::attachDefaultListeners();
//        $this->em = $this->getServiceLocator()->get('Doctrine\ORM\EntityManager');
//    }
}
